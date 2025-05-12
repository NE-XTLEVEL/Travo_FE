import { useState, useContext } from 'react';
import { RiArrowUpWideFill } from 'react-icons/ri';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';
import grids from './assets/grids.svg';
import { PlanContext } from '../context/PlanContext';

const PlanMobile = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const { data } = useContext(PlanContext);
  const dayCount = Object.keys(data).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ height: '8%', boxSizing: 'border-box' }}>
        <Header
          mobile={true}
          planName={
            dayCount === 1
              ? '당일치기 여행 계획'
              : `${dayCount - 1}박 ${dayCount}일 여행 계획`
          }
        />
      </div>
      <div
        style={{
          position: 'relative',
          height: '92%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            height: '100%',
            width: '100%',
          }}
        >
          <Map />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            height: isSheetOpen ? '60%' : '40px',
            width: '100%',
            transition: 'height 0.4s ease',
            borderTop: '1px solid #D9D9D9',
            borderRadius: '20px 10px 0 0',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            backgroundImage: `url(${grids})`,
          }}
        >
          <div
            onClick={() => setIsSheetOpen(!isSheetOpen)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '5px 20px',
              cursor: 'pointer',
            }}
          >
            <RiArrowUpWideFill
              size={30}
              color="#030045"
              style={{
                transform: isSheetOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.4s ease',
              }}
            />
          </div>
          <div
            style={{
              height: 'calc(100% - 50px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
            }}
          >
            <Recommendation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanMobile;
