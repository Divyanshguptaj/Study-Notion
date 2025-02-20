import React from 'react';
import standing_lady_with_book from '../../../assets/Images/standing_lady_with_book.jpg';
import HiglightedText from './HiglightedText';
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';

const BecomeInstructor = () => {
  return (
    <div className="w-full flex p-20 h-[90vh] gap-10">
      {/* Left Side - Image Section */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={standing_lady_with_book}
          alt="Standing Lady with Book"
          className="object-contain w-full"
          style={{
            boxShadow: "20px 20px 0px white",
          }}
        />
      </div>

      {/* Right Side - Text or Additional Content */}
      <div className="w-1/2 flex flex-col justify-center items-start pl-10">
        <h2 className="text-4xl font-bold mb-4 flex flex-col">&nbsp;Become an<HiglightedText text="Instructor"/></h2>
        <p className="text-sm text-gray-400 mb-6">
          Share your knowledge and inspire students around the world by becoming an instructor. 
          Join a community of passionate educators and make a difference.
        </p>
        <CTAButton text={<><p>Start Teaching Today</p><FaArrowRight /></>} color="yellow" link="/signup"/>
      </div>
    </div>
  );
};

export default BecomeInstructor;
