import './Card.css';
import { ReactComponent as Option } from './assets/Card_option.svg';

function typeNameChange(type) {
  switch (type) {
    case 'accommodation':
      return '숙소';
    case 'transport':
      return '교통';
    case 'restaurant':
      return '식당';
    case 'cafe':
      return '카페';
    case 'activity':
      return '놀거리';
    default:
      '';
      return type;
  }
}

const Card = ({ item }) => {
  return (
    <div className="Card">
      <div className="CardContent">
        <div className="CardType">{typeNameChange(item.type)}</div>
        <div className="CardLowLine">
          <div className="CardName">{item.name}</div>
          {item.isReservationNeeded && (
            <div
              className="CardButton"
              onClick={() => window.open('https://www.naver.com', '_blank')}
            >
              예약하기
            </div>
          )}
        </div>
      </div>

      <div className="Option">
        <Option />
      </div>
    </div>
  );
};

export default Card;
