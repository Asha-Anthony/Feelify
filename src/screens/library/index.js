import { useState , useEffect } from "react";
import React  from 'react';
// import { playlist } from "./playlist";
import "./library.css";
import { useNavigate } from "react-router-dom";
export default function Library(props) {

  const [songs , setSongs] = useState([])

  async function fetchPSongs(){
    console.log(props.username);
    const link = "http://127.0.0.1:5000/get_songs/"+props.username;

    fetch(link, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json' 
      }
    }).then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            console.log("in library")
            console.log(data);
            setSongs(data)
  
          
        })
    );
     
  
    }
  
    useEffect(() => {
      // Using fetch to fetch the api from
      // flask server it will be redirected to proxy
      fetchPSongs()
  }, []);

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
  )
}
