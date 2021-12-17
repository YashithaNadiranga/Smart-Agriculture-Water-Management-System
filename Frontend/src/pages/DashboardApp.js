// material
import React, { useEffect } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppWaterLevel,
  AppAllSoils,
  AppNewsUpdate,
  AppAllPlants,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('username') === undefined) {
      navigate('/login');
    } else {
      // navigate('/dashboard/app');
    }
  }, []);

  function fetchdata() {
    fetch('http://localhost:5000/plant/').then((resp) => {
      resp.json().then((result) => {
        // setExam(result);
        console.log(result);
      });
    });
  }

  return (
    <Page title="Dashboard | WMS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppAllPlants />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppAllSoils />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWaterLevel />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
