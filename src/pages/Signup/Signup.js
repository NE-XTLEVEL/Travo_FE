import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    axios
      .post(
        'https://api-server-860259406241.asia-northeast1.run.app/auth/signup',
        {
          email: email,
          password: password,
          name: name,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };
  //비밀번호 일치 확인
  const confirmPassword = (password, checkPassword) => {
    setPasswordError(password !== checkPassword);
  };
  return (
    <div
      className="signup-wrapper"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="signup-logo">
        <img src="/logo.svg" alt="Logo" className="logo-image" />
        <button className="logo-button" onClick={() => navigate('/')}>
          Travo
        </button>
      </div>
      <div className="signup-container">
        <div>
          <input
            type="text"
            id="id"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="id"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* {emailError && <div>{emailError}</div>} */}
        <div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordError !== null && (
          <p style={{ color: passwordError ? 'red' : 'green' }}>
            {passwordError
              ? '비밀번호가 일치하지 않습니다.'
              : '비밀번호가 일치합니다.'}
          </p>
        )}
        <div>
          <input
            type="password"
            id="checkpassword"
            placeholder="비밀번호 확인"
            onChange={(e) => {
              confirmPassword(password, e.target.value);
            }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          className="signup-button"
          onClick={handleSignup}
          disabled={passwordError}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Signup;
