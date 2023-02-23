import React from "react";

const SidebarLink = ({ text, Icon }) => {
  return (
    <div className="text-[#d9d9d9]  flex items-center justify-center xl:justify-start text-xl space-x-3 w-fit py-2 px-4 box-border">
      <Icon />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
