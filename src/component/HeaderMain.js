import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Sidebar from './Sidebar';

const HeaderMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const plans = [
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 1,
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
      <img src="/logo.png" width={30} style={{ margin: '10px' }} />
      <div style={{ padding: '10px', fontSize: '20px' }}>Travo</div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          fontSize: '20px',
        }}
      >
        <input
          style={{
            background: 'none',
            border: 'none',
            height: '50px',
            width: '40%',
            fontSize: '80%',
            textAlign: 'center',
            outline: 'none',
          }}
        ></input>
      </div>
      <button
        style={{ background: 'none', border: 'none', margin: '10px' }}
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={30} />
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
