import React from 'react';
import HeaderMain from '../component/HeaderMain';
import './Main.css';
import Main2 from './Main2';
import Footer from '../component/Footer';
import '../component/Footer.css';
import { FiCalendar } from 'react-icons/fi';
import { MdPeopleOutline, MdKeyboardArrowDown } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import mainDescriptionImg from './assets/mainDescription.png';
import mainPhonePCImg from './assets/mainPhonePCImg.png';

const Main = () => {
  return (
    <>
      <div className="MainContainer">
        <div className="Main" id="firstPage">
          <div className="MainHeader">
            <HeaderMain />
          </div>
          <div style={{ width: '100vw' }}>
            <div className="MainImage">
              <img
                className="MainDescription wow fadeInLeft delay-05s animated"
                src={mainDescriptionImg}
                alt="MainDescription"
              ></img>
              <img
                className="MainPhonePCImg wow fadeInUp delay-05s animated"
                src={mainPhonePCImg}
                alt="mainPhonePCImg"
              ></img>
            </div>
            <div className="MainContent">
              <div className="MainOption">
                <div className="OptionDate">
                  <FiCalendar size={'2.25vw'} />
                  <div>2025.04.09(수) ~ 2025.04.11(금)</div>
                </div>
                <div className="OptionPeople">
                  <MdPeopleOutline size={'3vw'} />
                  <div>2명</div>
                </div>
              </div>
              <div className="MainPrompt">
                <input
                  className="MainPromptInput"
                  type="text"
                  placeholder="연인과 함께 북촌으로 봄 여행을 가고 싶어"
                ></input>
                <LuSend size={'3vw'} stroke="#030045" strokeWidth={2} />
              </div>
              <div className="MainBelowButton">
                <MdKeyboardArrowDown size={'3.75vw'} color="#B0B0B0" />
              </div>
            </div>
          </div>
        </div>
        <Main2 />
        <Footer />
      </div>
    </>
  );
};

export default Main;
