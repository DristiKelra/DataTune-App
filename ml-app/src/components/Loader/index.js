import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
