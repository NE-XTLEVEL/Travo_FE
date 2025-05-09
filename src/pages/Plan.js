import React from 'react';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';

const Plan = () => {
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
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Plan;
