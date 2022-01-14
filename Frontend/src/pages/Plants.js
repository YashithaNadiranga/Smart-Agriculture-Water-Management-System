import * as React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { ToastContainer, toast } from 'react-toastify';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TextField,
  TableHead,
  IconButton
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

// after
import { styled } from '@mui/material/styles';

// components
import { LoadingButton } from '@mui/lab';
import Paper from '@mui/material/Paper';
import axios from '../axios/axios';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00AB55',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

// ----------------------------------------------------------------------

export default function Plant() {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const [lastid, setLastId] = useState(0);
  const [age, setAge] = React.useState('');
  const [tomois, settomois] = useState(null);
  const [cal, setcal] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // clearformik();
    setOpen(false);
    if (editData) {
      setEditData(false);
      getlastId();
      formik.values.pname = '';
      formik.values.stype = '';
      formik.values.smois = '';
      formik.values.channel = '';
    }
  };

  const clearformikdata = () => {
    getlastId();
    formik.values.pname = '';
    formik.values.stype = '';
    formik.values.smois = '';
    formik.values.channel = '';
  };

  const clearformikerror = () => {
    formik.errors.pid = false;
    formik.errors.pname = false;
    formik.errors.stype = false;
    formik.errors.smois = false;
    formik.values.channel = false;
  };

  const handleChanged = (event) => {
    setAge(event.target.value);
  };

  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const ValidateSchemas = Yup.object().shape({
    pid: Yup.string().required('Plant Id is required'),
    pname: Yup.string().required('Plant name is required'),
    stype: Yup.string().required('Soil Type is required'),
    smois: Yup.string().required('Recommended water intake is required'),
    channel: Yup.string().required('Channel is required')
  });

  function addData(dt) {
    // eslint-disable-next-line arrow-body-style
    axios.post('/plant/add/', dt).then((res) => {
      if (res.data.success === 'success') {
        getData();
        setOpen(false);
        clearformikdata();
      }
    });
  }

  function getData() {
    try {
      axios.get('/getplants/').then((res) => {
        setData(res.data.Plant);
        if (res && res.data) {
          const obj = [0];
          // eslint-disable-next-line-array-callback-return
          res.data.Plant.map((item) => {
            const temp = { id: item.channel, val: 0 };
            obj.push(temp);
          });
          settomois(obj);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  function fetchmotorval(val) {
    try {
      fetch(`https://api.thingspeak.com/channels/${val.channel}/fields/1.json?results=1/`).then(
        (resp) => {
          resp.json().then((result) => {
            const datas = result && result.feeds && result.feeds[0].field1;
            const tempArray = [...tomois];
            tomois?.map((item, index) => {
              if (item.id === val.channel) {
                tempArray[index] = { id: val.channel, val: datas };
              }
            });
            settomois(tempArray);

            // settomois(datas);
            // if (datas === '1') {
            //   setChecked(true);
            // } else {
            //   setChecked(false);
            // }
          });
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  function calculation(val) {
    {
      tomois?.map((item, index) => {
        if (item.id === val.channel) {
          console.log(item.val);
          // console.log(val.smois - item.val);
          // setcal(val.smois - item.val);
          toast.info(`Water To be Added - ${val.smois - item.val} %`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
      });
    }
    console.log(val);
  }

  const deletedata = () => {
    axios.delete(`/plant/delete/?pid=${formik.values.pid}`).then((res) => {
      if (res.data.success === 'success') {
        getData();
        setEditData(false);
        setOpen(false);
        clearformikdata();
      }
    });
  };

  const onEditData = () => {
    axios.put('/plant/update/', formik.values).then((res) => {
      if (res.data.success === 'success') {
        getData();
        setOpen(false);
        clearformikdata();
      }
    });
  };

  function getlastId() {
    axios.get('/plant/getlastid/').then((res) => {
      // setLastId(res.data.lastid);
      formik.values.pid = res.data.lastid;
      // console.log(res.data);
    });
  }

  const formik = useFormik({
    initialValues: {
      pid: '',
      pname: '',
      stype: '',
      smois: '',
      channel: ''
    },
    validationSchema: ValidateSchemas,
    onSubmit: (values) => {
      // console.log(values);
      addData(values);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
  };

  useEffect(() => {
    getData();
    getlastId();
  }, []);

  const onEditTable = (data) => {
    setEditData(true);
    setOpen(!open);
    formik.values.pid = data.pid;
    formik.values.pname = data.pname;
    formik.values.stype = data.stype;
    formik.values.smois = data.smois;
    formik.values.channel = data.channel;
  };

  return (
    <Page title="Dashboard: Plants | WMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Plants
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleOpen}
          >
            New Plant Type
          </Button>
        </Stack>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {!editData ? 'Add New Plant' : 'Edit Plant'}
            </Typography>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  disabled
                  id="pid"
                  label="Plant ID"
                  variant="outlined"
                  sx={{ mt: 3, width: '20%' }}
                  onChange={formik.handleChange}
                  value={formik.values.pid}
                  {...getFieldProps('pid')}
                  error={Boolean(touched.pid && errors.pid)}
                  helperText={touched.pid && errors.pid}
                />
                <TextField
                  id="pname"
                  label="Plant Name"
                  variant="outlined"
                  sx={{ mt: 3, width: '75%', ml: 3 }}
                  onChange={formik.handleChange}
                  value={formik.values.pname}
                  {...getFieldProps('pname')}
                  error={Boolean(touched.pname && errors.pname)}
                  helperText={touched.pname && errors.pname}
                />

                {/* <TextField
                  id="stype"
                  label="Soil Type"
                  variant="outlined"
                  sx={{ mt: 3, width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.stype}
                  {...getFieldProps('stype')}
                  error={Boolean(touched.stype && errors.stype)}
                  helperText={touched.stype && errors.stype}
                /> */}

                <FormControl fullWidth sx={{ mt: 4 }}>
                  <InputLabel id="stype">Soil Type</InputLabel>
                  <Select
                    id="stype"
                    value={formik.values.stype}
                    label="Soil Type"
                    onChange={formik.handleChange}
                    {...getFieldProps('stype')}
                    error={Boolean(touched.stype && errors.stype)}
                    helperText={touched.stype && errors.stype}
                  >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Paddy">Paddy</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="smois"
                  label="Recommended Water Intake"
                  variant="outlined"
                  sx={{ mt: 3, width: '47%' }}
                  onChange={formik.handleChange}
                  value={formik.values.smois}
                  {...getFieldProps('smois')}
                  error={Boolean(touched.smois && errors.smois)}
                  helperText={touched.smois && errors.smois}
                />

                <TextField
                  id="channel"
                  label="Channel Id"
                  variant="outlined"
                  sx={{ mt: 3, width: '47%', ml: 4 }}
                  onChange={formik.handleChange}
                  value={formik.values.channel}
                  {...getFieldProps('channel')}
                  error={Boolean(touched.channel && errors.channel)}
                  helperText={touched.channel && errors.channel}
                />

                <div sx={{ width: '50%' }}> </div>

                {!editData ? (
                  <LoadingButton
                    sx={{ mt: 3, alignItems: 'center' }}
                    variant="contained"
                    type="submit"
                    // component={RouterLink}
                    startIcon={<Icon icon={plusFill} />}
                    loading={load}
                    // onClick={handleOpen}
                  >
                    Add New Plant
                  </LoadingButton>
                ) : (
                  <>
                    <LoadingButton
                      sx={{ mt: 3, alignItems: 'center' }}
                      variant="contained"
                      type="button"
                      // component={RouterLink}
                      startIcon={<Icon icon="akar-icons:edit" />}
                      loading={load}
                      onClick={onEditData}
                    >
                      Update Plant
                    </LoadingButton>

                    <LoadingButton
                      sx={{ mt: 3, alignItems: 'center', ml: 3, backgroundColor: 'red' }}
                      color="error"
                      variant="contained"
                      type="button"
                      // component={RouterLink}
                      startIcon={<Icon icon="fluent:delete-24-filled" />}
                      loading={load}
                      onClick={deletedata}
                    >
                      Delete
                    </LoadingButton>
                  </>
                )}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {/* Tempory Disabled */}
                </Typography>
              </Form>
            </FormikProvider>
          </Box>
        </Modal>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Plant Id</StyledTableCell>
                <StyledTableCell align="left">Plant Name</StyledTableCell>
                <StyledTableCell align="right">Soil Type</StyledTableCell>
                <StyledTableCell align="right">Soil Moistrue</StyledTableCell>
                <StyledTableCell align="right">Recomend Water</StyledTableCell>
                {/* <StyledTableCell align="right">
                  How much more water should be added?
                </StyledTableCell> */}
                <StyledTableCell align="right">Channel</StyledTableCell>
                <StyledTableCell align="right">View Prediction</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.pid} onClick={() => fetchmotorval(row)}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.pid}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.pname}</StyledTableCell>
                  <StyledTableCell align="right">{row.stype}</StyledTableCell>
                  {tomois?.map((item, index) => {
                    if (item.id === row.channel) {
                      return (
                        <StyledTableCell key={index} align="right">
                          {item.val}
                        </StyledTableCell>
                      );
                    }
                  })}
                  <StyledTableCell align="right">{row.smois}</StyledTableCell>
                  <StyledTableCell align="right">{row.channel}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      onClick={() => calculation(row)}
                    >
                      <Icon icon="fa:eye" color="blue" width="24" height="24" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right" onClick={() => onEditTable(row)}>
                    <IconButton color="secondary" aria-label="add an alarm">
                      <Icon icon="akar-icons:edit" color="green" width="24" height="24" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
