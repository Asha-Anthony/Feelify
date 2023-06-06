import React from 'react';
import './sidebar.css';
import SidebarButton from './sidebarbutton';

import {FaGripfire , FaPlay, FaSignOutAlt} from "react-icons/fa";
import {IoLibrary} from "react-icons/io5";
import {MdEmojiEmotions} from "react-icons/md";
export default function Sidebar() {
  return (
    <div className='sidebar'>
      <img src="https://burst.shopifycdn.com/photos/profile-of-a-woman-wearing-bold-black-sunglasses.jpg?width=373&format=pjpg&exif=1&iptc=1"
       className='display-picture' alt="profile"/>
      <div>
        <SidebarButton title="Emotion" to="/emotions" icon={<MdEmojiEmotions/>}/>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire/>}/>
        <SidebarButton title="Library" to="/library" icon={<IoLibrary/>}/>
        <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>}/>
    </div>
  )
}
