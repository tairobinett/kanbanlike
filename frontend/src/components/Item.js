import React from 'react';
import { Paper, Typography } from '@mui/material';

const Item = ({ name, body }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 1 }}>
      <Typography variant="h6" component="h3">
        {name}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </Paper>
  );
};

export default Item;