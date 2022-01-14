import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// components
import Page from '../components/Page';

export default function Blog() {
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Channels
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Add New Channels
          </Button>
        </Stack>
        <Grid container spacing={3}>
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
                  <p style={{ fontSize: '16px' }}>Air Humidity</p>
                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1628835/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=&type=line&width=500"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
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
                    src="https://thingspeak.com/channels/1628835/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=&type=line&width=500"
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

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>Motor Status</p>
                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/channels/1631910/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=&type=line&width=500"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>MATLAB Visualizations</p>
                  <p style={{ fontSize: '11px' }}>
                    Visualize correlation between temperature and humidity
                  </p>

                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/apps/matlab_visualizations/443703"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>MATLAB Plot Output</p>
                  <p style={{ fontSize: '11px' }}>Histogram of Temperature Variation</p>

                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/apps/matlab_visualizations/443704"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ maxWidth: '100%', border: 'solid 2px green' }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>MATLAB Visualizations</p>
                  <p style={{ fontSize: '11px' }}>MATLAB Plot Output</p>

                  <iframe
                    style={{
                      border: 'none'
                    }}
                    title="myFrame"
                    width="100%"
                    height="260"
                    src="https://thingspeak.com/apps/matlab_visualizations/443705"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
