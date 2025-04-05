import React from 'react';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';

const Plan = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Map />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Recommendation />
      </div>
    </div>
  );
};

export default Plan;
