import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { PiSignInBold } from 'react-icons/pi';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import authAxios from './AuthAxios';

const Header = ({ mobile = false, planName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(planName || '');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    authAxios
      .get('/auth/check')
      .then((res) => {
        if (res.status == 200) {
          setAuth(true);
        }
      })
      .catch((error) => {
        setAuth(false);
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500); // 500ms 후 반영

    return () => {
      clearTimeout(handler); // 다음 입력 전에 이전 타이머 취소
    };
  }, [input]);

  // ✅ 이 effect는 debouncedInput이 바뀔 때만 실행됨
  useEffect(() => {
    if (debouncedInput) {
      // 여기에 API 호출
      console.log('요청:', debouncedInput);
    }
  }, [debouncedInput]);
  return (
    <div
      style={{
        backgroundColor: mobile ? 'transparent' : 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...(!mobile && { borderBottom: '1px solid #EFEFEF' }),
      }}
    >
      <button
        style={{
          background: 'none',
          border: 'none',
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 0,
        }}
        onClick={() => navigate('/main')}
      >
        <img
          src="/logo.svg"
          width={mobile ? 25 : 40}
          style={{ margin: '10px' }}
        />
        {!mobile && (
          <div
            style={{
              padding: '10px',
              fontSize: '24px',
              color: '#030045',
              fontWeight: 700,
            }}
          >
            Travo
          </div>
        )}
      </button>
      <div
        style={{
          flex: mobile ? 8 : 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {mobile ? (
          <div
            style={{
              padding: '10px',
              fontSize: '24px',
              color: '#030045',
              fontWeight: 700,
            }}
          >
            Travo
          </div>
        ) : (
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              border: 'none',
              height: '50px',
              width: '80%',
              fontSize: mobile ? '20px' : '26px',
              fontWeight: 700,
              textAlign: 'center',
              outline: 'none',
            }}
          ></input>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '10px',
        }}
      >
        {auth ? (
          <button
            style={{
              background: 'none',
              border: 'none',
            }}
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={mobile ? 20 : 30} color="#030045" />
          </button>
        ) : (
          <button
            style={{
              background: 'none',
              border: 'none',
            }}
            onClick={() => navigate('/login')}
          >
            <PiSignInBold size={mobile ? 20 : 30} color="#030045" />
          </button>
        )}
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mobile={mobile} />
    </div>
  );
};

export default Header;
