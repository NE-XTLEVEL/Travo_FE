import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMain from '../component/HeaderMain';
import './Main.css';
import Main2 from './Main2';
import Footer from '../component/Footer';
import '../component/Footer.css';
import '../component/CustomCalendar';
import { MdPeopleOutline, MdKeyboardArrowDown } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import mainDescriptionImg from './assets/mainDescription.svg';
import mainPhonePCImg from './assets/mainPhonePCImg.svg';
import CustomCalendar from '../component/CustomCalendar';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const Main = () => {
  // Calendar에서 시작, 끝 날짜 받아와서 적용
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (start, end) => {
    //CustomCalendar에서 start, end date 받아오면 값 바꿔줌
    setStartDate(start);
    setEndDate(end);
  };
  // 날짜 범위가 10일을 초과할 경우 경고창 띄우기
  const handleInvalidRange = () => {
    alert('최대 10일까지 선택 가능합니다.');
  };
  // 'YYYY.MM.DD(d)' 형식으로 date 변환
  const FormattingDate = (date) => {
    return moment(date).format('YYYY.MM.DD(ddd)');
  };
  /*인원수 input 받기*/
  const [peopleCount, setPeopleCount] = useState(2);
  const [showInput, setShowInput] = useState(false);

  const handleIconClick = () => {
    setShowInput(!showInput);
  };
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPeopleCount(value);
    }
  };
  // 서버로 데이터 request 보내기
  const [prompt, setPrompt] = useState(''); // 프롬프트
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const days = moment(endDate).diff(moment(startDate), 'days') + 1;

    try {
      const response = await fetch(
        'https://api-server-860259406241.asia-northeast1.run.app/location/recommendation/test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: prompt,
            date: moment(startDate).format('YYYY-MM-DD'),
            days: days,
            // eslint-disable-next-line camelcase
            plan_name: `${days}일 여행계획`,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('error fetching data');
      }
      const body1 = await response.json();
      const data = body1.data;
      navigate('/Plan', { state: { plan: data } });
    } catch (error) {
      console.error('Error:', error);
      alert('데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div className="MainContainer">
        <div className="Main" id="firstPage">
          <div className="MainHeader">
            <HeaderMain />
          </div>
          <div style={{ width: '100vw' }}>
            <div className="MainImage">
              <img
                className="MainDescription wow fadeInLeft delay-05s animated"
                src={mainDescriptionImg}
                alt="MainDescription"
              ></img>
              <img
                className="MainPhonePCImg wow fadeInUp delay-05s animated"
                src={mainPhonePCImg}
                alt="mainPhonePCImg"
              ></img>
            </div>
            <div className="MainContent">
              <div className="MainOption">
                <div className="OptionDate">
                  <CustomCalendar
                    onDateChange={handleDateChange}
                    onInvalidRange={handleInvalidRange}
                  />
                  <div>
                    <span>{FormattingDate(startDate)}</span> ~{' '}
                    <span>{FormattingDate(endDate)}</span>
                  </div>
                </div>
                <div className="OptionPeople" style={{ position: 'relative' }}>
                  <MdPeopleOutline
                    size={'3vw'}
                    onClick={handleIconClick}
                    style={{ cursor: 'pointer' }}
                  />
                  <div>{peopleCount}명</div>
                  {showInput && (
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={peopleCount}
                      onChange={handleInputChange}
                      onBlur={() => setShowInput(false)}
                      style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        top: '2.7vw',
                        left: '0',
                        width: '4rem',
                        padding: '0.3rem',
                        fontSize: '1rem',
                        zIndex: 10,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="MainPrompt">
                <input
                  className="MainPromptInput"
                  type="text"
                  placeholder="연인과 함께 북촌으로 봄 여행을 가고 싶어"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></input>
                <LuSend
                  size={'3vw'}
                  stroke="#030045"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  onClick={handleSubmit}
                />
              </div>
              <div className="MainBelowButton">
                <MdKeyboardArrowDown
                  className="Bouncing-arrow"
                  size={'3.75vw'}
                  color="#B0B0B0"
                />
              </div>
            </div>
          </div>
        </div>
        <Main2 />
        <Footer />
      </div>
    </>
  );
};

export default Main;
