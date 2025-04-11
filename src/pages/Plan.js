import React from 'react';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';

const Plan = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 2 }}>
        <Header />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 8,
        }}
      >
        <div
          style={{
            flex: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Map />
        </div>
        <div
          style={{
            flex: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            paddingRight: '20px',
          }}
        >
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Plan;
