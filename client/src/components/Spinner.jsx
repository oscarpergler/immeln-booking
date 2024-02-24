import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress />
      <p>Snart är det inte synd om dig idag heller.. 😎</p>
    </Box>
  );
}

export default Spinner;