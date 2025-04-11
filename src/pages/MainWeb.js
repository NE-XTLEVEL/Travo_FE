import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleContainer from '../component/Schedule/ScheduleContainer';

const MainWeb = () => {
  const navigate = useNavigate();
  return (
    <div>
      this is web
      <ScheduleContainer />
      <button onClick={() => navigate('/plan')}>plan</button>
    </div>
  );
};

export default MainWeb;
