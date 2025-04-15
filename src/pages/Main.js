import React from 'react';
import Header from '../component/Header';
import './Main.css';
import { FiCalendar } from 'react-icons/fi';
import { MdPeopleOutline } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';

const Main = () => {
  return (
    <div className="Main">
      <div className="MainHeader">
        <Header />
      </div>
      <div style={{ width: '100vw' }}>
        <div className="MainImage">어떤 여행을 떠나고 싶나요?</div>
        <div className="MainContent">
          <div className="MainOption">
            <div className="OptionDate">
              <FiCalendar />
              <div>2025.04.09(수) ~ 2025.04.11(금)</div>
            </div>
            <div className="OptionPeople">
              <MdPeopleOutline />
              <div>2명</div>
            </div>
          </div>
          <div className="MainPrompt">
            <input
              className="MainPromptInput"
              type="text"
              placeholder="연인과 함께 북촌으로 봄 여행을 가고 싶어"
            ></input>
            <LuSend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
