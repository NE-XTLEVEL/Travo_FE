import { useEffect, useRef } from 'react'; 
import './Map.css';

const MapComponent = () => { 
  const mapRef = useRef(null);

  useEffect(() => { 

    /**
     * 
     * InitMap 함수
     * 1) Kakao Map 초기화
     * 2) 마커 설정
     * 3) 선 설정
     * 
     * @param {*} markerData : 
     */
    const InitMap = (markerData) => { 
        // 1) Kakao Map 초기화
      if (window.kakao && window.kakao.maps) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 지도 초기 중심 좌표 (서울 시청 기준)
          level: 3, // 지도 확대/축소 레벨 (작을수록 더 확대됨)
        });

        // 2) 마커 설정
        const bounds = new window.kakao.maps.LatLngBounds(); // 마커들이 있는 위치를 모두 포함하는 범위 계산

        Object.values(markerData).forEach((locations, dayIndex) => { // day 무시하고 장소 배열만 가져옴 (locations:특정 날짜의 장소 리스트, dayIndex: 날짜 인덱스)
          const linePath = [];

          const markerImg = new window.kakao.maps.MarkerImage(
            `${process.env.PUBLIC_URL}/markerDay${dayIndex + 1}.png`,
            new window.kakao.maps.Size(40, 45), // 마커 크기
            { offset: new window.kakao.maps.Point(20, 45) } // 마커 실제 꼭짓점 기준 (마커 하단 중앙)
          );

          locations.forEach((loc) => {
            const position = new window.kakao.maps.LatLng(loc.y, loc.x); // 장소의 위도(y), 경도(x)로 마커 위치 만듦
            linePath.push(position); // 경로 배열 -> 선 그릴 때 사용
            bounds.extend(position); // 현재 마커 bounds에 포함시킴

            new window.kakao.maps.Marker({ // 마커를 지도 위에 생성하고 표시
              position,
              map,
              image: markerImg,
            });
          });

          // 3) 선 설정
          const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: [
              '#1CBB39',
              '#FF4646',
              '#38A7EC',
              '#FF762D',
              '#FB6AA1',
            ][dayIndex % 5],
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
          });

          polyline.setMap(map);
        });

        map.setBounds(bounds); // bounds에 저장된 모든 마커 한 화면 안에 보이도록 (카카오맵 제공 메서드)
      } else {
        console.error('카카오맵 API가 로드되지 않았습니다.');
      }
    };

    /**
     * loadMapScript 함수 - Kakao Map API 스크립트 생성, 로드
     */
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;

      script.async = true;
      document.head.appendChild(script);

      // 카카오맵 내부 완전히 준비 된 후, mockData 가져와서 InitMap 호출, 마커와 선 그림
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          fetch('/mockData.json')
            .then((res) => res.json())
            .then((data) => window.kakao.maps.load(() => InitMap(data)))
            .catch((err) => console.error('데이터 로딩 실패:', err));
        } else {
          console.error('카카오맵 API가 정상적으로 로드되지 않았습니다.');
        }
      };
    };

    /**
     * Kakao Map API가 로드되어 있지 않은 경우, loadMapScript 함수를 호출
     * Kakao Map API가 이미 로드된 경우, fetch를 통해 mock 데이터를 가져와 InitMap 함수 호출
     */
    if (!window.kakao || !window.kakao.maps) {
      loadMapScript();
    } else {
      fetch('/mockData.json')
        .then((res) => res.json())
        .then((data) => window.kakao.maps.load(() => InitMap(data)))
        .catch((err) => console.error('데이터 로딩 실패:', err));
    }
  }, []);

  // 렌더링할 JSX를 반환. React 애플리케이션 
  return <div className="mapViewContainer" ref={mapRef}></div>;
};

export default MapComponent;
