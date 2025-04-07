import { /*useEffect,*/ useState } from 'react';
import './AddLocation.css';
import { FaPlus } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';

const AddLocation = ({ dayPlan, setDayPlan }) => {
  const [places, setPlaces] = useState([]);
  const [keyWord, setKeyWord] = useState('');

  // useEffect(() => {
  //   const loadKakaoMap = () => {
  //     if (window.kakao) {
  //       return;
  //     }

  //     const script = document.createElement('script');
  //     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
  //     script.async = true;
  //     document.head.appendChild(script);

  //     script.onload = () => {
  //       console.log('Kakao Map API 로드 완료');
  //       window.kakao.maps.load(() => {
  //         console.log('Kakao Maps Services 로드 완료');
  //       });
  //     };
  //   };
  //   loadKakaoMap();
  // });
  const searchPlaces = (keyWord) => {
    if (!window.kakao || !window.kakao.maps) return;

    // const options = {
    //   location: new window.kakao.maps.LatLng(
    //     37.58629750845203,
    //     127.02922775537017
    //   ),
    //   radius: 20000,
    //   sort: window.kakao.maps.services.SortBy.DISTANCE,
    // };

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      keyWord,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          console.log('검색 완료', data);
        }
      }
      /*options*/
    );
  };

  const handleAdd = (place) => {
    if (!dayPlan.some((dayplan) => dayplan.id === place.id)) {
      const updated = [
        ...dayPlan,
        {
          id: place.id,
          type: place.category_group_name,
          name: place.place_name,
          isReservationNeeded: true,
          reservationUrl: place.place_url,
        },
      ];
      setDayPlan(updated);
      console.log(updated);
    } else {
      console.log('이미 있는 장소입니다.');
      console.log(dayPlan);
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
        }}
      >
        <div style={{ fontSize: '130%' }}>
          추가하고 싶은 장소를 검색해보세요
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
          <FiSearch
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
                onClick={() => handleAdd(place)}
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

export default AddLocation;
