import { useContext, useState } from 'react';
import './AddLocation.css';
import { LuSend } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa6';
import { PlanContext } from '../context/PlanContext';
// import AuthAxios from './AuthAxios';
import axios from 'axios';

const FixLocation = ({ item, close, dayId }) => {
  const [keyWord, setKeyWord] = useState('');
  const [places, setPlaces] = useState([]);
  const { setData } = useContext(PlanContext);
  /* eslint-disable camelcase */
  const fixPlaces = (keyWord) => {
    axios
      .post(
        'https://api.travo.kr/location/recommendation/one',
        {
          description: keyWord,
          day: 0,
          category: item.category,
          is_lunch: true,
          x: item.x,
          y: item.y,
          high_review: true,
          local_id: item.local_id,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data);
      })
      .catch((err) => {
        console.log('fixlocation 실패', err);
      });
  };
  /* eslint-enable camelcase */
  const handleFix = (place) => {
    console.log(dayId);
    setData((prevData) => {
      console.log(prevData[`day${dayId}`]);
      const updatedDayList = prevData[`day${dayId}`].map((oldItem) =>
        oldItem.local_id === place.local_id ? place : oldItem
      );

      return {
        ...prevData,
        [`day${dayId}`]: updatedDayList, // 수정한 일차만 교체
      };
    });
    close();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fixPlaces(keyWord);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 1. 제목 영역 (20%) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <div style={{ fontSize: '130%' }}>
          {item.name}을 어떤 장소로 바꿀까요?
        </div>
      </div>

      {/* 2. 검색창 영역 (10%) */}
      <div
        style={{
          flex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '90%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#EFEFEF',
            borderRadius: '10px',
          }}
        >
          <textarea
            className="searchbar"
            style={{
              fontSize: '100%',
              width: '80%',
              resize: 'none',
              overflowY: 'auto',
              maxHeight: '200px',
              minHeight: '80px',
              lineHeight: '1.5',
              outline: 'none',
            }}
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <LuSend
            onClick={() => fixPlaces(keyWord)}
            style={{ cursor: 'pointer', scale: '1.5' }}
          />
        </div>
      </div>

      {/* 3. 리스트 영역 (70%) */}
      <div
        className="scroll-container"
        style={{
          flex: 7,
          overflow: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <ul
          style={{
            margin: '0px',
            paddingLeft: '0px',
            display: 'flex',
            maxHeight: '100%',
            flexDirection: 'column',
            // flexWrap: 'wrap',
          }}
        >
          {places.map((place) => (
            <li key={place.kakao_id} className="search-item">
              <div
                style={{
                  flex: 5,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>{place.category}</div>
                  <div style={{ height: '30px' }}></div>
                  <div style={{ color: '#B0B0B0' }}>{place.address}</div>
                </div>

                <strong>{place.name}</strong>
              </div>
              <button
                style={{ flex: 1 }}
                className="addlocation-button"
                onClick={() => handleFix(place)}
              >
                <FaPlus />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FixLocation;
