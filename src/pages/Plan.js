import React from 'react';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';
import { useLocation } from 'react-router-dom';

const Plan = () => {
  const location = useLocation();
  const { plan } = location.state || {}; // plan이 undefined일 경우를 대비하여 기본값 설정
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ height: '10%', boxSizing: 'border-box' }}>
        <Header />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '90%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            flex: 6,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0 20px 20px',
            boxSizing: 'border-box',
          }}
        >
          <Map />
        </div>
        <div
          style={{
            flex: 4,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            paddingRight: '20px',
            boxSizing: 'border-box',
          }}
        >
          <Recommendation plan={plan} />
        </div>
      </div>
    </div>
  );
};

export default Plan;
