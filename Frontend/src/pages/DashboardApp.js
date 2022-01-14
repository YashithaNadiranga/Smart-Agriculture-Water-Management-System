// material
import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import WeatherCard from '../components/weather/card';
import axios from '../axios/axios';

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
  const [data, setData] = useState('0');
  const [wdata, setWdata] = useState({
    name: 'NaN',
    main: [{ temp: '0' }],
    weather: [{ main: 'NaN' }]
  });
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    getData();
    getWeatherData();
    setInterval(() => {
      setDateState(new Date());
    }, 1000);
    if (cookies.get('username') === undefined) {
      navigate('/login');
    } else {
      // navigate('/dashboard/app');
    }
  }, []);

  function getData() {
    axios.get('/dashboard/getallcount/').then((res) => {
      setData(res.data.plantcount);
    });
  }

  function getWeatherData() {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=6.75511453189087&lon=80.05017596178016&appid=' //1cc5ca389e8489194b21dc857f906e89
      )
      .then((res) => {
        setWdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sty = {
    paddingLeft: 20
  };

  return (
    <Page title="Dashboard | WMS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <WeatherCard
              name="Date & Time"
              data={new Date().toLocaleString()}
              iconn="ic:baseline-access-time"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WeatherCard name="Location" data={wdata.name} iconn="akar-icons:location" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WeatherCard
              name="Weather"
              data={wdata.weather[0].main}
              iconn="fluent:weather-hail-day-48-regular"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <WeatherCard
              name="Temp"
              data={`${(Math.round(wdata.main.temp - 273.15) * 100) / 100} °C`}
              iconn="raphael:temp"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppAllPlants data={data} />
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
          <Grid item xs={12} sm={12} md={12} sx={{ mb: 3 }}>
            DATA Visualization
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>Air Temperature</p>
                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1628835/widgets/406773"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>Soil Moisture Digital Meter</p>
                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1628835/widgets/406775"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>Soil Moisture</p>
                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1628835/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=&type=line&width=500"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>Motor Status</p>
                  <iframe
                    style={{ border: 'none' }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1631910/widgets/408070&title=Motor State&width=560"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
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
