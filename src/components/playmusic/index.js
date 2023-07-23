import React from 'react';
import { useEffect, useState } from "react"; 
import useSound from "use-sound"; 
import music from './tomorrow.mp3'; 
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; 
import { IconContext } from "react-icons"; 
import "./playmusic.css";

export default function PlayMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(music);
  
    const playingButton = () => {
      if (isPlaying) {
        pause(); 
        setIsPlaying(false);
      } else {
        play(); 
        setIsPlaying(true);
      }
    }
    const [currTime, setCurrTime] = useState({
      min: "",
      sec: "",
    }); // current position of the audio in minutes and seconds
  
    const [seconds, setSeconds] = useState();

   
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      const time = {
        min: min,
        sec: secRemain}
 

    useEffect(() => {
      const interval = setInterval(() => {
        if (sound) {
          setSeconds(sound.seek([])); // setting the seconds state with the current state
          const min = Math.floor(sound.seek([]) / 60);
          const sec = Math.floor(sound.seek([]) % 60);
          setCurrTime({
            min,
            sec,
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [sound]);

  return (
    <div className="card">
    <h2>Playing Now</h2>
    <img
      className="musicCover"
      src="https://techiemore.com/wp-content/uploads/Violet-and-Yellow-Retro-Funny-Melting-Face-Workout-Playlist-Cover.jpg"
    />
    <div>
      <h3 className="title">Tomorrow</h3>
      <p className="subTitle">Sad</p>
    </div>
    <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
    <div className='rows'>
      <button className="playButton">
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <BiSkipPrevious />
        </IconContext.Provider>
      </button>
      {!isPlaying ? (
        <button className="playButton" onClick={playingButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <AiFillPlayCircle />
          </IconContext.Provider>
        </button>
      ) : (
        <button className="playButton" onClick={playingButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <AiFillPauseCircle />
          </IconContext.Provider>
        </button>
      )}
      <button className="playButton">
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <BiSkipNext />
        </IconContext.Provider>
      </button>
    </div>
  </div>
  )
}
