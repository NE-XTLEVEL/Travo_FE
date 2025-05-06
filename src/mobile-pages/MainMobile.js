import { React, useState } from 'react';
import moment from 'moment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainMobile.css';
import CustomCalendar from '../component/CustomCalendar';
import Header from '../component/Header';
import { useNavigate } from 'react-router-dom';
import { MdPeopleOutline } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import intro1 from './assets/intro1.svg';
import intro2 from './assets/intro2.svg';
import intro3 from './assets/intro3.svg';

const MainMobile = () => {
  const navigate = useNavigate();
  // Calendar에서 시작, 끝 날짜 받아와서 적용
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [prompt, setPrompt] = useState(''); // 프롬프트
  //slider option
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSubmit = async () => {
    const days = moment(endDate).diff(moment(startDate), 'days') + 1;

    try {
      const response = await fetch(
        'https://api.travo.kr/location/recommendation/test',
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
  const handleDateChange = (start, end) => {
    //CustomCalendar에서 start, end date 받아오면 값 바꿔줌
    setStartDate(start);
    setEndDate(end);
  };
  // 날짜 범위가 10일을 초과할 경우 경고창 띄우기
  const handleInvalidRange = () => {
    alert('최대 10일까지 선택 가능합니다.');
  };
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
  return (
    <div
      className="mobile-body"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <div style={{ height: '10%', boxSizing: 'border-box' }}>
        <Header mobile={true} />
      </div>
      <Slider
        {...settings}
        style={{
          flex: 9,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          adaptiveHeight: true,
        }}
      >
        <div>
          <img src={intro1}></img>
        </div>
        <div>
          <img src={intro2}></img>
        </div>
        <div>
          <img src={intro3}></img>
        </div>
      </Slider>
      <div className="mobile-bottom">
        <div
          style={{
            width: '62.5vw',
            minWidth: '300px',
            paddingLeft: '15px',
            paddingBottom: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
            }}
          >
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
            <div style={{ fontSize: '15px' }}>{peopleCount}명</div>
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
      </div>
    </div>
  );
};

export default MainMobile;
