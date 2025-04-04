import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainWeb = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>this is web</div>
      <button onClick={() => navigate('/recommendation')}>추천받기</button>
    </div>
  );
};

export default MainWeb;
