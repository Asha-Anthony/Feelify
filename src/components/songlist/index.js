import React from 'react';
import './songlist.css'
import { useNavigate } from "react-router-dom";

const SongList = ({ songs }) => {
  const navigate = useNavigate();
  const playPlaylist = (id) =>{
    navigate("/player",{state:{id:id}});
}

  return (
    <div>
        {songs.map((song) => (
                  <div className='song-body' >
                  <div className="playlist-card"  key ={song.id} onClick={ ()=>playPlaylist(songs.id) } >
                  <img  src="https://i.pinimg.com/736x/3a/06/a9/3a06a9236b8ef1265a7fa0181c32bc68.jpg" className ="playlist-image" alt="Playlist-Art"/>
                  <p className="playlist-title">{song.name}</p>
                  <p className="playlist-subtitle"> {song.emotion}</p>
                  <div className="playlist-fade">
                  <img className="playlist-play" alt="play-icon" src ="https://uploads-ssl.webflow.com/5fc56861e9c9af05f5f079ab/6021aba5e20d307631bda1ff_Icon%20Burgundy%20Video.png"/></div>
                  </div>
                  </div>

        //    <div className="song">
        //    <div className="thumbnail">
        //      <img src={song.thumbnail} alt={song.song_name} />
        //    </div>
        //    <div className="details">
        //      <h3>{song.song_name}</h3>
        //      <p>Artist: {song.artist}</p>
        //      <p>Duration: {song.duration}</p>
        //      <p>Emotion: {song.emotion}</p>
        //    </div>
        //  </div>
        ))}
    </div>
  );
};

export default SongList;