import React from 'react';
import './songlist.css'
import { useNavigate } from "react-router-dom";

const SongList = ({ songs }) => {
  const navigate = useNavigate();

  const playPlaylist = (id) =>{
    navigate("/player",{state:{id:id}});
}

  return (

<div className='screen-container'>
      <div className="library-body">
      {
        songs?.map((songs)=>(
          <div className="playlist-card"  key ={songs._id} onClick={ ()=>playPlaylist(songs.song) }>
             <img  src={songs.thumbnail} className ="playlist-image" alt="Playlist-Art"/>
            <p className="playlist-title">{songs.id}</p>
            <p className="playlist-subtitle"> Songs</p>
            <div className="playlist-fade">
            <img className="playlist-play" alt="play-icon" src ="https://uploads-ssl.webflow.com/5fc56861e9c9af05f5f079ab/6021aba5e20d307631bda1ff_Icon%20Burgundy%20Video.png"/></div>
            </div>
                   ))
                  }
                </div>
                </div>
  );
};

export default SongList;