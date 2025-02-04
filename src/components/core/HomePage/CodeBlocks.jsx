import React from 'react';
import CTAButton from '../HomePage/Button';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-center gap-10 w-full bg-transparent`}>
      {/* Heading and Buttons Section */}
      <div className="flex flex-col w-[50%] mx-20 justify-center">
        <div className="text-center mb-5">{heading}</div>
        <div className="text-richblack-300 text-center">{subheading}</div>
        <div className="flex gap-7 justify-center">
          <CTAButton text={ctabtn1.text} color={ctabtn1.color} link={ctabtn1.link} />
          <CTAButton text={ctabtn2.text} color={ctabtn2.color} link={ctabtn2.link} />
        </div>
      </div>

      {/* Code Block Section */}
      <div className="flex w-[50%] mx-20 relative bg-transparent">
        {/* Line Numbers */}
        <div className="flex flex-col text-center w-[10%] text-richblack-300 font-bold bg-transparent">
          {Array.from({ length: 13 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Block */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-mono ${codeColor} px-4 bg-transparent rounded-lg`}
          style={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7), 0px -4px 10px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, '']}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: 'pre-wrap',
              display: 'block',
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
