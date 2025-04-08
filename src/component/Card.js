import './Card.css';
import { ReactComponent as Option } from './assets/Card_option.svg';

const Card = ({ item }) => {
  return (
    <div className="Card">
      <div className="CardContent">
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

      <div className="Option">
        <Option />
      </div>
    </div>
  );
};

export default Card;
