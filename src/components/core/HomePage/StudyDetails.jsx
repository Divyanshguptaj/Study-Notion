import React from 'react';
import { BiDiamond } from 'react-icons/bi';
import { SlBadge } from 'react-icons/sl';
import { FaGraduationCap } from 'react-icons/fa';
import { HiMiniCodeBracket } from "react-icons/hi2";
const iconsMap = {
  SlBadge: SlBadge,
  FaGraduationCap: FaGraduationCap,
  BiDiamond: BiDiamond,
  HiMiniCodeBracket: HiMiniCodeBracket,
};

const StudyDetails = ({ icon, name, description, color}) => {
  const IconComponent = iconsMap[icon]; // Dynamically select the icon component
  const colorClasses = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    emerald: "text-emerald-500",
    yellow: "text-yellow-500",
  };
  return (
    <div className="flex items-center gap-4 p-4 bg-white">
      <div className={`text-2xl ${colorClasses[color]} shadow-lg rounded-full p-2`}>
        <IconComponent />
      </div>
      <div>
        <h3 className="text-md font-bold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default StudyDetails;
