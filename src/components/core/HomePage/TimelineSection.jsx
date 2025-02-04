import React from 'react';
import StudyDetails from './StudyDetails';
import study_image from '../../../assets/Images/study_image.jpg'
const TimelineSection = () => {
  return (
    <div className="bg-white w-full flex justify-center items-center px-40">
      <div className="flex flex-col w-[40%] gap-6">
        <StudyDetails 
          icon="SlBadge" 
          name="Leadership" 
          description="Fully committed to the success company" 
          color="blue"
        />
        <StudyDetails 
          icon="FaGraduationCap" 
          name="Responsibility" 
          description="Students will always be our top priority" 
          color="orange"
          />
        <StudyDetails 
          icon="BiDiamond" 
          name="Flexibility" 
          description="The ability to switch is an important skill" 
          color="emerald"
          />
        <StudyDetails 
          icon="HiMiniCodeBracket" 
          name="Solve the problem" 
          description="Code your way to a solution" 
          color="yellow"
          />
      </div>

      <div className="w-[60%] flex p-10 shadow-2xl object-fit relative">
        <img src={study_image} alt="" />
        <div className='absolute bg-green-700 flex text-white uppercase p-10 items-center justify-center w-[50%] left-[50%] translate-x-[-50%] bottom-[-5%] '>
            <div className='flex gap-5 items-center justify-center border-r border-green-300 pe-5'>
              <p className='font-bold text-3xl'>10</p>
              <p className='text-green-300 text-sm'>Years of Experience</p>
            </div>
            <div className='flex gap-5 items-center justify-center ps-5'>
              <p className='font-bold text-3xl'>250</p>
              <p className='text-green-300 text-sm'>Type of courses</p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default TimelineSection;
