import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Sidebar from './Sidebar';

const HeaderMain = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const plans = [
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 2,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 3,
      plan: '2박3일 서울 여행 계획',
    },
  ];
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo.png"
        width={mobile ? 25 : 40}
        style={{ margin: '10px' }}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          fontSize: mobile ? '18px' : '24px',
          color: '#030045',
        }}
      >
        <p style={{ fontWeight: 700 }}>Travo</p>
      </div>
      <button
        style={{ background: 'none', border: 'none', margin: '10px' }}
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={mobile ? 20 : 30} color="#030045" />
      </button>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        {plans.map((plan) => (
          <div key={plan.id} className="search-item">
            {plan.plan}
          </div>
        ))}
      </Sidebar>
    </div>
  );
};

export default HeaderMain;
