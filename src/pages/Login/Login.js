import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('access_Token');
  //   axios
  //     .get('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         navigate('/home');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   document.body.classList.add('login-body');
  //   return () => {
  //     document.body.classList.remove('login-body');
  //   };
  // }, []);

  const handleLogin = async () => {
    axios
      .post(
        'https://api-server-860259406241.asia-northeast1.run.app/auth/login',
        {
          email: email,
          password: password,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          const accessToken = res.data.access_Token;
          const refreshToken = res.data.refresh_Token;
          localStorage.setItem('access_Token', accessToken);
          localStorage.setItem('refresh_Token', refreshToken);
          console.log(accessToken);
          console.log(refreshToken);
          navigate('/main');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="login-logo">
        <img src="/logo.svg" alt="Logo" className="logo-image" />
        <button className="logo-button" onClick={() => navigate('/')}>
          Travo
        </button>
      </div>
      <div className="login-container">
        <div>
          <input
            type="text"
            id="id"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>로그인</button>
      </div>
      <div className="login-links">
        <button
          className="login-transparent-button"
          onClick={() => navigate('/Login/Signup')}
        >
          회원가입
        </button>
        <button
          className="login-transparent-button"
          onClick={() => navigate('/Login/ForgetId')}
        >
          아이디 찾기
        </button>
        <button
          className="login-transparent-button"
          onClick={() => navigate('/Login/Forgetpassword')}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default Login;
