import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainWeb = () => {
  const navigate = useNavigate();
  return (
    <div>
      this is web
      <button onClick={() => navigate('/plan')}>plan</button>
      <button onClick={() => navigate('/main')}>main</button>
    </div>
  );
};

export default MainWeb;
