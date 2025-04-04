import { useEffect, useState } from 'react';
import DayList from './DayList.js';

const Recommendation = () => {
  const [data, setData] = useState([]);
  const [day, setDay] = useState(0);

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await fetch('/mockData.json');
        const body = await response.json();
        setData(body);
        setDay(body.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    LoadData();
  }, []);
  return (
    <div>
      {Array.from({ length: day }, (_, index) => (
        <DayList key={index + 1} day={index + 1} data={data} />
      ))}
    </div>
  );
};

export default Recommendation;
