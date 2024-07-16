import React from 'react';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const Item = ({ name, body, helloFunction }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 1 }}>
      <Typography variant="h6" component="h3">
        {name}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
      <Button 
        variant="contained" 
        onClick={helloFunction}>
        Delete
      </Button>
    </Paper>
  );
};

export default Item;