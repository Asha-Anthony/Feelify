import React from 'react'
import { useState } from "react";
import Trending from '../trending';
import Camera from '../../components/camera/camera';
import './emotions.css';
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

    <button className='btn'  onClick={toggleCam}>Use Camera</button>
    or 
    <button className='btn' onClick={toggleText}>Use text</button>
    {isCam && <Camera/>}
    {isText && <Trending/>}
  </div>
  )
}
