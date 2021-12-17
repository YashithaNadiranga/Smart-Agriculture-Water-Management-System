import * as React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Stack, Typography, Button, Modal, Box, TextField } from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const { load, setLoad } = useState(false);

  const ValidateSchemas = Yup.object().shape({
    pid: Yup.string().required('Plant Id is required'),
    pname: Yup.string().required('Plant name is required'),
    stype: Yup.string().required('Soil Type is required'),
    smois: Yup.string().required('Soil Moisture is required')
  });

  function fetchdata(op) {
    fetch('http://127.0.0.1:5000/plant/add/', op).then((resp) => {
      resp.json().then((result) => {
        // setExam(result);
        console.log(result);
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
      // alert(JSON.stringify(values, null, 2));
      // console.log(JSON.stringify(values, null, 2));
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify(values)
      };

      fetchdata(requestOptions);

      navigate('/dashboard/app');
      fetchdata();
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

        {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}