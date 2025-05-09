import { useContext } from 'react';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';
import { PlanContext } from '../context/PlanContext';

const Plan = () => {
  const { data } = useContext(PlanContext);
  const dayCount = Object.keys(data).length;
  console.log('plan', dayCount);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ height: '10%', boxSizing: 'border-box' }}>
        <Header
          planName={
            dayCount === 1
              ? '당일치기 여행 계획'
              : `${dayCount - 1}박 ${dayCount}일 여행 계획`
          }
        />
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
          <Map plan={data} />
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
