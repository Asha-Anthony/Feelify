import React from 'react';
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
//import music from './tomorrow.mp3'; 
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "./playmusic.css";

export default function PlayMusic(props) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const link = "https://docs.google.com/uc?export=download&id=" + props.id;

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const [thumbnail , setThumb] = useState([]);
  const [emotion , setEmotion] = useState([]);

  async function fetchThumb(){
    const link1 = "http://127.0.0.1:5000/fetchThumb/"+props.id;
    fetch(link1, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json' 
      }
    }).then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            console.log(data.thumbnail);
            setThumb(data.thumbnail)
            setEmotion(data.emotion)
  
          
        })
    );
     
  
    }
  
    useEffect(() => {
      // Using fetch to fetch the api from
      // flask server it will be redirected to proxy
      fetchThumb()
  }, []);



  return (



    <div className="card">
      <h2>Playing Now</h2>
      <img
        className="musicCover"
        src={thumbnail}
      />
      <div>
        <h3 className="subTitle">{emotion}</h3>
      </div>
      <div>
        <audio
          ref={audioRef}
          src={link}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
        ></audio>
         
        {!isPlaying ? (
          <button className="playButton" onClick={handlePlayPause}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={handlePlayPause}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <div className="time">
          <p>
            {formatTime(currentTime)}
          </p>
          <p>
            {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>




  );
}
