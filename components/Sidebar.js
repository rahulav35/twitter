import React from "react";
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs";
import { BiHash } from "react-icons/bi";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import SidebarLink from "./SidebarLink";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className=" hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full border-r border-gray-400 pr-0  xl:pr-8 box-border top-0 left-0">
      <div className="flex items-center justify-center w-14 h-14 xl:ml-24 ">
        <BsTwitter className="text-white text-[34px] animate-pulse" />
      </div>
      <div className="space-y-2 mt-4 mb-2 xl:ml-24">
        <SidebarLink text="Home" Icon={AiFillHome} />
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <SidebarLink text="Profile" Icon={AiOutlineUser} />
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#168ede] text-white rounded-full w-48 h-[48px] text-lg font-bold mt-3">
        Tweet
      </button>

      <div
        onClick={signOut}
        className="text-[#d9d9d9] flex items-center justify-center mt-auto xl:ml-auto xl:-mr-1 px-4 py-2 box-border  border-b-[1px] border-white rounded-full"
      >
        <div className="hidden xl:inline leading-5 ">
          <h4 className="font-bold text-sm">{session?.user.name}</h4>
          <h4 className="text-[#6e767d] text-xs">@{session?.user.tag}</h4>
        </div>

        <BsThreeDots className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
