import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Background, LoadingText } from './LoadingStyles';
import Spinner from './assets/Spinner.gif';

const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { description, startDate, days, planName } = location.state || {};
      try {
        const response = await fetch(
          'https://api-server-860259406241.asia-northeast1.run.app/location/recommendation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description,
              date: startDate,
              days,
              // eslint-disable-next-line camelcase
              plan_name: planName,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('error fetching data');
        }
        const body1 = await response.json();
        const data = body1.data;
        // 응답 받으면 Plan 페이지로 이동
        navigate('/Plan', { state: { plan: data } });
      } catch (error) {
        console.error('Error:', error);
        alert('데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
        navigate('/main');
      }
    };
    fetchData();
  }, [location.state, navigate]);

  return (
    <Background>
      <LoadingText>일정을 생성 중입니다....</LoadingText>
      <img src={Spinner} alt="Loading..." style={{ width: '30%' }} />
    </Background>
  );
};

export default Loading;
