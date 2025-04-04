import { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5851349, 127.0284268), // 서울 좌표
          level: 3, // 확대 수준
        });

        // 기본 마커 크기 및 기준 줌 레벨
        const baseZoomLevel = 3; // 기준 줌 레벨
        const baseSize = { width: 64, height: 69 }; // 기본 마커 크기

        // 마커 위치
        const markerPosition = new window.kakao.maps.LatLng(37.5851349, 127.0284268); // 정보관 위치 (구글맵 기준)(구글맵 주소에서 위도 경도 확인 가능)

        // 마커 이미지 설정 함수
        const getMarkerImage = (width, height) => {
          return new window.kakao.maps.MarkerImage(
            process.env.PUBLIC_URL + '/tiger.png', // 이미지 수정 시, 왼쪽 경로 수정하면 됨
            new window.kakao.maps.Size(width, height),
            { offset: new window.kakao.maps.Point(width / 2, height) } // 클릭 위치 조정
          );
        };

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: getMarkerImage(baseSize.width, baseSize.height),
          map: map,
        });

        // 줌 변경 이벤트 추가
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const currentZoom = map.getLevel(); // 현재 줌 레벨
          const scale = baseZoomLevel / currentZoom; // 줌 레벨에 따른 크기 조절 비율
          const newSize = {
            width: Math.max(20, baseSize.width * scale), // 최소 크기 제한
            height: Math.max(20, baseSize.height * scale),
          };

          // 마커 크기 업데이트
          marker.setImage(getMarkerImage(newSize.width, newSize.height));
        });

      } else {
        console.error("카카오맵 API가 로드되지 않았습니다.");
      }
    };

    // 🔹 카카오맵 스크립트가 이미 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`; // appkey -> .env
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(initMap);
        } else {
          console.error("카카오맵 API가 정상적으로 로드되지 않았습니다.");
        }
      };
    } else {
      window.kakao.maps.load(initMap);
    }
  }, []);

  return (
    <div className="view" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="text" style={{ marginBottom: "16px" }}>
        NE:XT contest map api test
      </h1>
      <div className="map" ref={mapRef} style={{ width: "500px", height: "500px", backgroundColor: "lightgray" }}></div>
    </div>
  );
};

export default MapComponent;
