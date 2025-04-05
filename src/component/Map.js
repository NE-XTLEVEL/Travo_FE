import { useEffect, useRef } from 'react';
import './Map.css';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const InitMap = () => {
      if (window.kakao && window.kakao.maps) {
        const Map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5851349, 127.0284268), // 서울 좌표
          level: 3, // 확대 수준
        });

        // 기본 마커 크기 및 기준 줌 레벨
        const baseZoomLevel = 3; // 기준 줌 레벨
        const baseSize = { width: 64, height: 69 }; // 기본 마커 크기

        // 마커 위치
        const markerPosition = new window.kakao.maps.LatLng(
          37.5851349,
          127.0284268
        );

        // 마커 이미지 설정 함수
        const GetMarkerImage = (width, height) => {
          return new window.kakao.maps.MarkerImage(
            process.env.PUBLIC_URL + '/tiger.png',
            new window.kakao.maps.Size(width, height),
            { offset: new window.kakao.maps.Point(width / 2, height) }
          );
        };

        // 마커 생성
        const Marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: GetMarkerImage(baseSize.width, baseSize.height),
          map: Map,
        });

        // 줌 변경 이벤트 추가
        window.kakao.maps.event.addListener(Map, 'zoom_changed', () => {
          const currentZoom = Map.getLevel();
          const scale = baseZoomLevel / currentZoom;
          const newSize = {
            width: Math.max(20, baseSize.width * scale),
            height: Math.max(20, baseSize.height * scale),
          };

          // 마커 크기 업데이트
          Marker.setImage(GetMarkerImage(newSize.width, newSize.height));
        });
      } else {
        console.error('카카오맵 API가 로드되지 않았습니다.');
      }
    };

    // 카카오맵 스크립트 로드
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(InitMap);
        } else {
          console.error('카카오맵 API가 정상적으로 로드되지 않았습니다.');
        }
      };
    } else {
      window.kakao.maps.load(InitMap);
    }
  }, []);

  return (
    <div className="mapViewContainer">
      <div className="mapBox" ref={mapRef}></div>
    </div>
  );
};

export default MapComponent;
