import React from 'react';
import HiglightedText from './HiglightedText';
import Imagells1 from '../../../assets/Images/homeStudy1.png';
import Imagells2 from '../../../assets/Images/homeStudy2.png';
import Imagells3 from '../../../assets/Images/homeStudy3.png';
import CTAButton from  './Button';
const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col p-40 bg-white w-[100%] justify-center pb-10">

      <div className="font-bold text-4xl text-black w-11/12 flex justify-center">
        <p>Your swiss knife for</p><HiglightedText text="learning a language" />
      </div>

      <div className="text-sm text-black w-11/12 flex justify-center pt-5">
        <p className="w-[60%] text-center">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more
        </p>
      </div>

      <div className="flex w-11/12 items-center justify-center mt-10 p-5">
        <img src={Imagells1} alt="" className="shadow-2xl" style={{ transform: "rotate(15deg)" }}/>
        <img src={Imagells2} alt="" className="shadow-2xl" style={{ transform: "rotate(-8.36deg)" }}/>
        <img src={Imagells3} alt="" className="shadow-2xl" style={{ transform: "rotate(9.88deg)" }}/>
      </div>

      <div className="w-11/12 flex justify-center p-10">
        <CTAButton text="Learn More" color="yellow" link="/login" />
      </div>

    </div>
  )
}

export default LearningLanguageSection;
