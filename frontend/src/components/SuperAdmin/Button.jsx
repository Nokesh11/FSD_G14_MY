import React from "react";

const Button = ({ label, Icon, color, hoverColor }) => (
  <button className={`${color} text-white px-4 py-2 rounded ${hoverColor} flex items-center`}>
    <Icon size={16} className="mr-1" />
    {label}
  </button>
);

export default Button;
