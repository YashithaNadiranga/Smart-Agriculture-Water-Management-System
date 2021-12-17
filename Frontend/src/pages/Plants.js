import * as React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Stack, Typography, Button, Modal, Box, TextField } from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Plant() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const { load, setLoad } = useState(false);
  const { data, setData } = useState('[]');

  const ValidateSchemas = Yup.object().shape({
    pid: Yup.string().required('Plant Id is required'),
    pname: Yup.string().required('Plant name is required'),
    stype: Yup.string().required('Soil Type is required'),
    smois: Yup.string().required('Soil Moisture is required')
  });

  function adddata(op) {
    fetch('http://127.0.0.1:5000/plant/add/', op).then((resp) => {
      resp.json().then((result) => {
        // setExam(result);
        console.log(result);
      });
    });
  }

  function getData() {
    fetch('http://127.0.0.1:5000/getplants/').then((resp) => {
      resp.json().then((result) => {
        
      });
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
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify(values)
      };

      adddata(requestOptions);
      getData();
      navigate('/dashboard/app');
      setOpen(false);
      setLoad(false);
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
    // overflow: 'scroll'
  };

  function createData(name, calories, fat, carbs, protein) {
    console.log({ name, calories, fat, carbs, protein });
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    // { name: 'gdsg', calories: 'sdg', fat: 'dfgds', carbs: 'bb', protein: 'ghfdhd' },
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0)
    // // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // // createData('Eclair', 262, 16.0, 24, 6.0),
    // // createData('Cupcake', 305, 3.7, 67, 4.3),
    // // createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

  useEffect(() => {
    getData();
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{row.calories}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
