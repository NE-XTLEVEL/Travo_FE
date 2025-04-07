import react from 'react';
import { useState } from 'react';
import Card from './Card.js';
import './DayList.css';
import Modal from './Modal.js';
import AddLocation from './AddLocation.js';
import TransportDuration from './TransportDuration';

function DayList({ day, data }) {
  const originItems = data[day - 1] || [];
  const colors = ['#FF4646', '#1CBB39', '#811CBB', 'orange', 'blue'];
  const dayColor = colors[(day - 1) % colors.length];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(originItems);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="DayList">
      <div className="DayHeader">
        <div className="dayNum" style={{ color: dayColor }}>
          {day}일차
        </div>
        <div className="addPlace">
          <button className="addButton" onClick={openModal}>
            {' '}
            + 장소추가
          </button>
        </div>
      </div>
      {items.map((item, index) => (
        <react.Fragment key={item.id}>
          <Card key={item.id} item={item} />
          {index < items.length - 1 && (
            <TransportDuration from={item.id} to={items[index + 1].id} />
          )}
        </react.Fragment>
      ))}
      <Modal open={isModalOpen} close={closeModal}>
        <AddLocation dayPlan={items} setDayPlan={setItems} />
      </Modal>
    </div>
  );
}

export default DayList;
