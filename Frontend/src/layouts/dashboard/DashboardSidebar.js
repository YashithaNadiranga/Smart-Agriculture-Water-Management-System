import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import Switch from '@mui/material/Switch';
import axios from '../../axios/axios';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [dis, setdis] = useState(false);
  const [checked, setChecked] = React.useState(false);

  function fetchmotorval() {
    fetch('https://api.thingspeak.com/channels/1631910/fields/1.json?results=1/').then((resp) => {
      resp.json().then((result) => {
        const datas = result.feeds[0].field1;
        console.log(typeof datas);
        if (datas === '1') {
          setChecked(true);
        } else {
          setChecked(false);
        }
      });
    });
  }

  useEffect(() => {
    fetchmotorval();
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function getData(data) {
    axios
      .get(`https://api.thingspeak.com/update?api_key=H761270P8G4GBFYE&field1=${data}`)
      .then((res) => {
        console.log(data);
      });
  }

  const notify = () =>
    toast.success(`The motor turns ${!checked ? 'on' : 'off'} in a few seconds`, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const handleChange = (event) => {
    setdis(!dis);
    setChecked(event.target.checked);
    if (event.target.checked) {
      getData(1);
    } else {
      getData(0);
    }
    notify();
    setTimeout(() => {
      setdis(false);
      console.log('time');
    }, 15000);
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, textAlign: 'center' }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo sx={{ width: '100px', height: '100px' }}>LOGO</Logo>
        </Box>
      </Box>

      <Box sx={{ mb: 2, mx: 0, mt: -3 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle sx={{ backgroundColor: 'white' }}>
            <Box sx={{ ml: 0 }}>
              <Typography variant="h6" sx={{ color: '#00AB55', textAlign: 'center' }}>
                AGRICULTURE WATER MANAGEMENT SYSTEM
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box> */}

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 5 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
          <Box
            component="img"
            src="/static/illustrations/ss.png"
            sx={{ width: 100, position: 'absolute', top: -30 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Supply Water?
            </Typography>
          </Box>

          <Switch
            disabled={dis}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          {/* <Button fullWidth variant="contained">
            Turn {st} Motor
          </Button> */}
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
