import React from 'react';
import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './CustomCalendar.css';

const CustomCalendar = ({ onDateChange, onInvalidRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState([null, null]);
  const [selecting, setSelecting] = useState(true);

  const handleClickDay = (value) => {
    if (selecting) {
      //시작 날짜 선택
      setRange([value, null]);
      setSelecting(false);
    } else {
      const start = range[0];
      if (value < start) {
        // 시작 날짜보다 이전 날짜 선택 시 시작 날짜 변경
        setRange([value, null]);
      } else {
        // 끝 날짜 선택 완료
        const diffInDays = moment(value).diff(moment(start), 'days');

        if (diffInDays > 9) {
          onInvalidRange && onInvalidRange();
          setRange([null, null]);
          setSelecting(true);
          setIsOpen(false);
          return;
        }
        const newRange = [start, value];
        setRange(newRange);
        onDateChange && onDateChange(newRange[0], newRange[1]);
        setSelecting(true);

        // 0.3s 후 캘린더 자동 닫기
        setTimeout(() => {
          setIsOpen(false);
        }, 300);
      }
    }
  };

  const tileClassName = ({ date }) => {
    const [start, end] = range;
    if (start && end) {
      if (date >= start && date <= end) {
        return 'selected-range';
      }
    }
    return null;
  };

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="calendarContainer" style={{ position: 'relative' }}>
      <FiCalendar
        size={'2.25vw'}
        onClick={handleToggleCalendar}
        cursor={'pointer'}
      />
      {isOpen && (
        <div className="calendarPopup" style={{ position: 'absolute' }}>
          <Calendar
            onClickDay={handleClickDay}
            tileClassName={tileClassName}
            value={range}
            formatDay={(locale, date) => moment(date).format('DD')}
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
