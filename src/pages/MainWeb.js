import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleContainer from '../components/Schedule/ScheduleContainer';
import AddLocation from '../component/AddLocation.js';
import { useState, useEffect } from 'react';
import Modal from '../component/Modal.js';

const MainWeb = () => {
  const [dayPlan, setDayPlan] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setDayPlan([
      {
        id: '16617901',
        categoryGroupName: '음식점',
        placeName: '본죽&비빔밥cafe 고려대점',
      },
      {
        id: '512026481',
        categoryGroupName: '카페페',
        placeName: '메가MGC커피 고대점',
      },
    ]);
  }, []);
  return (
    <div>
      this is web
      <ScheduleContainer />
      <button onClick={openModal}>장소 추가</button>
      <button onClick={() => navigate('/recommendation')}>추천받기</button>
      <Modal open={isModalOpen} close={closeModal}>
        <AddLocation dayPlan={dayPlan} setDayPlan={setDayPlan} />
      </Modal>
    </div>
  );
};

export default MainWeb;
