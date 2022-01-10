import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWuvXhP04o0BOaWH0WSrAMEEKWtkuqbj7iuj8OvN0Kl9ZNOoedmp8885WWrbm9Z3qScj8&usqp=CAU"
          alt="green iguana"
        /> */}
        <CardContent sx={{ textAlign: 'center' }}>
          <Icon icon={props.iconn} color="red" width="30" />
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
