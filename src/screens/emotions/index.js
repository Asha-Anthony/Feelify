import React from 'react'
import { useState } from "react";
import Trending from '../trending';
import Camera from '../../components/camera/camera';
export default function Emotions() {

  const [isCam, setIsCam] = useState(false);
  const [isText, setIsText] = useState(false);

  function toggleCam() {
    setIsCam((isCam) => !isCam);
    if(!isCam){
      setIsText((false) );
    }
  }
  function toggleText() {
    setIsText((isText) => !isText);
    if(!isText){
      setIsCam((false) );
    }
  }
  return (
    <div className='screen-container'>
    {isCam && <Camera/>}
    {isText && <Trending/>}
    <button onClick={toggleCam}>Use Camera</button>
    <button onClick={toggleText}>Use text</button>
  </div>
  )
}
