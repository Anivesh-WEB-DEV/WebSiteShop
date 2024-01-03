import React from 'react';
import Error from '../assets/NotFound.jpg';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={Error} alt="" style={{ width: '500px', height: '480px', objectFit: 'contain' }} />
    </div>
  );
};

export default NotFound;

