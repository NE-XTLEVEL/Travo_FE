import react from 'react';
import Card from './Card.js';
import './DayList.css';
import TransportDuration from './TransportDuration';

function DayList({ day, data }) {
  const items = data[day - 1] || [];
  const colors = ['#FF4646', '#1CBB39', '#811CBB', 'orange', 'blue'];
  const dayColor = colors[(day - 1) % colors.length];

  return (
    <div className="DayList">
      <div className="DayHeader">
        <div className="dayNum" style={{ color: dayColor }}>
          {day}일차
        </div>
        <div className="addPlace">
          <span className="addButton">+</span> 장소 추가
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
    </div>
  );
}

export default DayList;
