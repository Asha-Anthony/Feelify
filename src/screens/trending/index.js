import React,{useState,useEffect} from 'react'
import SongList from '../../components/songlist';
import './trending.css'
export default function Trending() {
  const [songs , setSongs] = useState([])

async function fetchSongs(){
  fetch("http://127.0.0.1:5000/getSongs", {
    method: 'GET',
    headers: {
      'Content-type': 'application/json' 
    }
  }).then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          console.log(data);
          setSongs(data)

        
      })
  );
   

  }

  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetchSongs()
}, []);


  return (
    <div className="playlist-grid">
       <div className="song-list">
     <SongList songs={songs} /> 
  </div>
  </div>
  )
}




