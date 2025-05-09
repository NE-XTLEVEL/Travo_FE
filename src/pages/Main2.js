import React from 'react';
import FadeInOnScroll from '../component/FadeInOnScroll.js';

import introImage1 from '../component/assets/Intro_Image_1.svg';
import introImage2 from '../component/assets/Intro_Image_2.svg';
import introImage3One from '../component/assets/Intro_Image_3_1.svg';
import introImage3Two from '../component/assets/Intro_Image_3_2.svg';
import introImage3Three from '../component/assets/Intro_Image_3_3.svg';

import introText1 from '../component/assets/Intro_Text_1.svg';
import introText2 from '../component/assets/Intro_Text_2.svg';
import introText3 from '../component/assets/Intro_Text_3.svg';
import introText3One from '../component/assets/Intro_Text_3_1.svg';
import introText3Two from '../component/assets/Intro_Text_3_2.svg';
import introText3Three from '../component/assets/Intro_Text_3_3.svg';

/**
 * ----- Main2 코드 구조 -----
 *  <Intro1> // "어떤 여행을 떠나고 싶나요?"
 *  <Intro2> // "여행 동선을 한 눈에 볼 수 있어요"
 *  <Intro3
 *    <Intro3-0 // "일정 수정도 쉬워요"
 *    <Intro3-1 // "Travo가 추천한 장소~"
 *    <Intro3-2 // "직접 장소를 추가~"
 *    <Intro3-3 // "일정을 드래그~"
 *  >
 * ----- div className -----
 * @Main2 : Main2 전체에 대한 최상위 div
 * @IntroBox : Intro 1,2,3 각각에 대한 div
 * @IntroItems : 나란히 표시되어야 하는 Image, Text 세트를 같운 div로 묶음
 */
const Main2 = () => {
  return (
    <div
      className="Main2 flex flex-col items-center justify-center gap-[8vw]"
      style={{
        width: '100%',
        backgroundImage: 'url(./assets/mainBackground.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Intro 1 */}
      <div className="Intro1 flex flex-row items-center justify-center gap-5 max-w-screen-lg w-full mx-auto">
        <FadeInOnScroll delay={0.4}>
          <div className="IntroItems flex flex-row items-center gap-5">
            <img
              src={introText1}
              alt="Intro Text 1"
              className="w-auto h-auto object-contain"
            />
            <img
              src={introImage1}
              alt="Intro Image 1"
              className="w-auto h-auto object-contain"
            />
          </div>
        </FadeInOnScroll>
      </div>

      {/* Intro 2 */}
      <div className="Intro2 flex flex-row items-center justify-center gap-5 max-w-screen-lg w-full mx-auto">
        <FadeInOnScroll delay={0.6}>
          <div className="IntroItems flex flex-row items-center gap-5">
            <img
              src={introText2}
              alt="Intro Text 2"
              className="w-auto h-auto object-contain"
            />
            <img
              src={introImage2}
              alt="Intro Image 2"
              className="w-auto h-auto object-contain"
            />
          </div>
        </FadeInOnScroll>
      </div>

      {/* Intro 3 */}
      <div className="Intro3 flex flex-col items-center justify-center gap-[6vw] max-w-screen-lg w-full mx-auto">
        {/* intro3-0 */}
        <div
          className="Intro3-0 flex items-center justify-center"
          style={{ marginBottom: '8vw' }}
        >
          <FadeInOnScroll delay={0.6}>
            <img
              src={introText3}
              alt="Intro Text 3"
              className="w-auto h-auto object-contain"
            />
          </FadeInOnScroll>
        </div>

        {/* intro3-1 */}
        <div className="Intro3-1 flex flex-row justify-center gap-5">
          <FadeInOnScroll delay={0.6}>
            <div className="IntroItems flex flex-row items-center gap-5">
              <img
                src={introImage3One}
                alt="Intro Image 3.1"
                className="w-auto h-auto object-contain"
              />
              <img
                src={introText3One}
                alt="Intro Text 3.1"
                className="w-auto h-auto object-contain"
              />
            </div>
          </FadeInOnScroll>
        </div>

        {/* intro3-2 */}
        <div className="Intro3-2 flex flex-row justify-center gap-5">
          <FadeInOnScroll delay={1.2}>
            <div className="IntroItems flex flex-row items-center gap-5">
              <img
                src={introText3Two}
                alt="Intro Text 3.2"
                className="w-auto h-auto object-contain"
              />
              <img
                src={introImage3Two}
                alt="Intro Image 3.2"
                className="w-auto h-auto object-contain"
              />
            </div>
          </FadeInOnScroll>
        </div>

        {/* intro3-3 */}
        <div className="Intro3-3 flex flex-row justify-center gap-5">
          <FadeInOnScroll delay={1.0}>
            <div className="IntroItems flex flex-row items-center gap-5">
              <img
                src={introImage3Three}
                alt="Intro Image 3.3"
                className="w-auto h-auto object-contain"
              />
              <img
                src={introText3Three}
                alt="Intro Text 3.3"
                className="w-auto h-auto object-contain"
              />
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Main2;
