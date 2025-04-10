import './Card.css';
import { ReactComponent as Option } from './assets/Card_option.svg';
import { PiForkKnife, PiCoffee, PiTrain } from 'react-icons/pi';
import { FiAlertCircle } from 'react-icons/fi';
import { LiaBedSolid } from 'react-icons/lia';

function CardIcons(category) {
  switch (category) {
    case '숙소':
      return <LiaBedSolid size={35} color="#B0B0B0" />;
    case '교통':
      return <PiTrain size={35} color="#B0B0B0" />;
    case '식당':
      return <PiForkKnife size={35} color="#B0B0B0" />;
    case '카페':
      return <PiCoffee size={35} color="#B0B0B0" />;
    default:
      return <FiAlertCircle size={35} color="#B0B0B0" />;
  }
}

const Card = ({ item }) => {
  return (
    <div className="Card">
      <div className="CardContent">
        <div className="CardImage">{CardIcons(item.category)}</div>
        <div className="CardInfo">
          <div className="CardType">{item.category}</div>
          <div className="CardLowLine">
            <div className="CardName">{item.name}</div>
            {item.url && (
              <div
                className="CardButton"
                onClick={() => window.open(item.url, '_blank')}
              >
                예약하기
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Option">
        <Option />
      </div>
    </div>
  );
};

export default Card;
