import { useState } from "react";
import React  from 'react';
import { playlist } from "./playlist";
import "./library.css";

export default function Library() {

  //const [playlist , setPlaylist] = useState(null);
  return (
    <div className='screen-container'>
      <div className="library-body">
      {
        playlist?.map((playlist)=>(
          <div className="playlist-card">
            <img  src={playlist.thumbnail} className ="playlist-image" alt="Playlist-Art"/>
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.total} Songs</p>
            <div className="playlist-fade">
            <img className="playlist-play" alt="play-icon" src ="https://uploads-ssl.webflow.com/5fc56861e9c9af05f5f079ab/6021aba5e20d307631bda1ff_Icon%20Burgundy%20Video.png"/></div>
            </div>
        ))
      }
    </div>
    </div>
  )
}
