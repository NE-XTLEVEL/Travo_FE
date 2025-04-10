import { useEffect, useState } from 'react';
import DayList from './DayList.js';

const Recommendation = () => {
  const [data, setData] = useState({});
  const [day, setDay] = useState(0);

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await fetch('/mockData.json');
        const body = await response.json();
        setData(body);
        setDay(Object.keys(body).length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    LoadData();
  }, []);
  return (
    <div>
      <ul
        style={{
          height: '100vh', // 원하는 높이로 조정
          overflowY: 'auto',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          border: '1px solid #ddd', // 선택사항
        }}
      >
        {Array.from({ length: day }, (_, index) => (
          <li key={index + 1}>
            <DayList day={index + 1} data={data[`day${index + 1}`]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
