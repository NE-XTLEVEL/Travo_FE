import { useEffect, useRef } from 'react';
import './Map.css';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const InitMap = (markerData) => {
      if (window.kakao && window.kakao.maps) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        });

        const bounds = new window.kakao.maps.LatLngBounds();

        Object.values(markerData).forEach((locations, dayIndex) => {
          const linePath = [];

          const markerImg = new window.kakao.maps.MarkerImage(
            `${process.env.PUBLIC_URL}/markerDay${dayIndex + 1}.png`,
            new window.kakao.maps.Size(40, 45),
            { offset: new window.kakao.maps.Point(20, 45) }
          );

          locations.forEach((loc) => {
            const position = new window.kakao.maps.LatLng(loc.y, loc.x);
            linePath.push(position);
            bounds.extend(position);

            const marker = new window.kakao.maps.Marker({
              position,
              map,
              image: markerImg,
              title: loc.name,
            });

            const info = new window.kakao.maps.InfoWindow({
              content: `<div style='padding:5px;font-size:14px;'><a href='${loc.url}' target='_blank' rel='noopener noreferrer'>${loc.name}</a></div>`,
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
              info.open(map, marker);
            });
          });

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

        map.setBounds(bounds);
      } else {
        console.error('카카오맵 API가 로드되지 않았습니다.');
      }
    };

    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`; //${process.env.REACT_APP_KAKAO_API_KEY}
      script.async = true;
      document.head.appendChild(script);

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

    if (!window.kakao || !window.kakao.maps) {
      loadMapScript();
    } else {
      fetch('/mockData.json')
        .then((res) => res.json())
        .then((data) => window.kakao.maps.load(() => InitMap(data)))
        .catch((err) => console.error('데이터 로딩 실패:', err));
    }
  }, []);

  return <div className="mapViewContainer" ref={mapRef}></div>;
};

export default MapComponent;
