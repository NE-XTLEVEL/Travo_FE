import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMobile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>this is mobile</h1>
      <button onClick={() => navigate('/plan')}>plan</button>
    </div>
  );
};

export default MainMobile;
