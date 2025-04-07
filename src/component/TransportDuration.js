import { useState, useEffect } from 'react';
import './TransportDuration.css';

const TransportDuration = ({ from, to }) => {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    async function Duration() {
      try {
        const response = await fetch('/mockDistanceData.json');
        const data = await response.json();

        const route = data.filter(
          (item) =>
            (item.placeId_1 === from && item.placeId_2 === to) ||
            (item.placeId_1 === to && item.placeId_2 === from)
        );

        if (route.length > 0) {
          setDuration(route[0].duration);
        } else {
          setDuration('?');
        }
      } catch (error) {
        console.error('Error fetching distance data:', error);
        setDuration('?');
      }
    }
    Duration();
  }, [from, to]);

  return (
    <div className="TransportContainer">
      <div className="TransportLine"></div>
      <div className="TransportTime">{duration}분</div>
    </div>
  );
};

export default TransportDuration;
