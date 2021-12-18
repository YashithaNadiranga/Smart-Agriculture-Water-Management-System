import * as React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
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
  TableHead
} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Paper from '@mui/material/Paper';
import axios from '../axios/axios';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

// ----------------------------------------------------------------------

export default function Plant() {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // clearformik();
    setOpen(false);
    if (editData) {
      setEditData(false);
      formik.values.pid = '';
      formik.values.pname = '';
      formik.values.stype = '';
      formik.values.smois = '';
    }
  };

  const clearformikdata = () => {
    formik.values.pid = '';
    formik.values.pname = '';
    formik.values.stype = '';
    formik.values.smois = '';
  };

  const clearformikerror = () => {
    formik.errors.pid = false;
    formik.errors.pname = false;
    formik.errors.stype = false;
    formik.errors.smois = false;
  };

  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  const ValidateSchemas = Yup.object().shape({
    pid: Yup.string().required('Plant Id is required'),
    pname: Yup.string().required('Plant name is required'),
    stype: Yup.string().required('Soil Type is required'),
    smois: Yup.string().required('Soil Moisture is required')
  });

  function addData(dt) {
    // eslint-disable-next-line arrow-body-style
    axios.post('/plant/add/', dt).then((res) => {
      if (res.data.success === 'success') {
        getData();
        setOpen(false);
        setLoad(false);
        clearformikdata();
      }
    });
  }

  function getData() {
    axios.get('/getplants/').then((res) => {
      setData(res.data.Plant);
      // console.log(res.data);
    });
  }

  const formik = useFormik({
    initialValues: {
      pid: '',
      pname: '',
      stype: '',
      smois: ''
    },
    validationSchema: ValidateSchemas,
    onSubmit: (values) => {
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
  }, []);

  const onEditTable = (data) => {
    setEditData(true);
    setOpen(!open);
    formik.values.pid = data.pid;
    formik.values.pname = data.pname;
    formik.values.stype = data.stype;
    formik.values.smois = data.smois;
  };

  const onEditData = () => {
    console.log(formik.values.pid);
    console.log(formik.values.pname);
    console.log(formik.values.stype);
    console.log(formik.values.smois);
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
              Add New Plant
            </Typography>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  id="pid"
                  label="Plant ID"
                  variant="outlined"
                  sx={{ mt: 3, width: '100%' }}
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
                  sx={{ mt: 3, width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.pname}
                  {...getFieldProps('pname')}
                  error={Boolean(touched.pname && errors.pname)}
                  helperText={touched.pname && errors.pname}
                />

                <TextField
                  id="stype"
                  label="Soil Type"
                  variant="outlined"
                  sx={{ mt: 3, width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.stype}
                  {...getFieldProps('stype')}
                  error={Boolean(touched.stype && errors.stype)}
                  helperText={touched.stype && errors.stype}
                />

                <TextField
                  id="smois"
                  label="Soil Moisture"
                  variant="outlined"
                  sx={{ mt: 3, width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.smois}
                  {...getFieldProps('smois')}
                  error={Boolean(touched.smois && errors.smois)}
                  helperText={touched.smois && errors.smois}
                />

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
                  <LoadingButton
                    sx={{ mt: 3, alignItems: 'center' }}
                    variant="contained"
                    type="button"
                    // component={RouterLink}
                    startIcon={<Icon icon={plusFill} />}
                    loading={load}
                    onClick={onEditData}
                  >
                    Edit Plant
                  </LoadingButton>
                )}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {/* Tempory Disabled */}
                </Typography>
              </Form>
            </FormikProvider>
          </Box>
        </Modal>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Plant Id</TableCell>
                <TableCell>Plant Name</TableCell>
                <TableCell align="right">Soil Type</TableCell>
                <TableCell align="right">Soil Moistrue</TableCell>
                <TableCell align="right">Water to be added</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.pid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{row.pid}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.pname}
                  </TableCell>
                  <TableCell align="right">{row.stype}</TableCell>
                  <TableCell align="right">{row.smois}</TableCell>
                  <TableCell align="right">{row.smois}</TableCell>
                  <TableCell align="right" onClick={() => onEditTable(row)}>
                    Edit
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
