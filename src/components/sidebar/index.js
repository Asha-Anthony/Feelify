import React from 'react';
import './sidebar.css';
import SidebarButton from './sidebarbutton';

import {FaGripfire , FaPlay, FaSignOutAlt} from "react-icons/fa";
import {IoLibrary} from "react-icons/io5";
import {MdEmojiEmotions} from "react-icons/md";
export default function Sidebar() {
  return (
    <div className='sidebar'>
      <img src="https://docs.google.com/uc?export=download&id=1MfF10UXbdsstjaxbph_sWqx3dLD0z-yP"
       className='display-picture' alt="profile"/>
      <div>
        <SidebarButton title="Emotion" to="/emotions" icon={<MdEmojiEmotions/>}/>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire/>}/>
        <SidebarButton title="Library" to="/library" icon={<IoLibrary/>}/>
        <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
      </div>
      <SidebarButton title="Sign Out" to="http://localhost:3000/auth/login" icon={<FaSignOutAlt/>}/>
    </div>
  )
}
