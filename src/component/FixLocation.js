import { useState } from 'react';
import axios from 'axios';
import './AddLocation.css';
import { LuSend } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa6';

const FixLocation = ({ item, setDayPlan }) => {
  const [keyWord, setKeyWord] = useState('');
  const [places, setPlaces] = useState([]);
  const searchPlaces = ({ keyWord }) => {
    const url = '' + keyWord;
    axios
      .get(url)
      .then((res) => {
        setPlaces(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFix = ({ place }) => {
    setDayPlan((prevData) =>
      prevData.map((item) => (item.id === place.id ? place : item))
    );
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
        }}
      >
        <div style={{ fontSize: '130%' }}>
          {item.name}을 어떤 장소로 바꿀까요?
        </div>
      </div>

      {/* 2. 검색창 영역 (10%) */}
      <div
        style={{
          flex: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '90%',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#EFEFEF',
            borderRadius: '10px',
          }}
        >
          <input
            className="searchbar"
            style={{ fontSize: '130%' }}
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
          <LuSend
            onClick={() => searchPlaces(keyWord)}
            style={{ cursor: 'pointer', scale: '1.5' }}
          />
        </div>
      </div>

      {/* 3. 리스트 영역 (70%) */}
      <div
        className="scroll-container"
        style={{
          flex: 9,
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
            <li key={place.id} className="search-item">
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>{place.category_group_name}</div>
                  <div>{place.address_name}</div>
                </div>

                <strong>{place.place_name}</strong>
              </div>
              <button
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
