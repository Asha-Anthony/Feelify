import React from 'react';
import { useEffect, useState , useRef } from "react"; 
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

  const link = "https://docs.google.com/uc?export=download&id="+props.id;

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



  return (
    <div>
      <audio
        ref={audioRef}
        src={link}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      ></audio>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
