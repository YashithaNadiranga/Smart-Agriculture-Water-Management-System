import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('username') !== undefined) {
      alert('You are Already Logged. Continue Dashboard');
      navigate('/dashboard/app');
    } else {
      // empty
      // console.log('Hello');
    }
  }, []);

  return (
    <RootStyle title="Register | WMS">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, textAlign: 'center' }}>
            SMART AGRICULTURE WATER MANAGEMENT SYSTEM
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_logins.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" gutterBottom>
              GET STARTED
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Box>

          {/* <AuthSocial /> */}

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to SAWMS&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
