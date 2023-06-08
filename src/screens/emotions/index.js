import React from 'react'
import { useState } from "react";
import Camera from '../../components/camera/camera';

import ChatBot from 'react-simple-chatbot';
const steps = [
  {
      id: '0',
      message: 'Hey there!',

      // This calls the next id
      // i.e. id 1 in this case
      trigger: '1',
  }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: 'Welcome back to Feelify ! how was your day?',
      trigger: '2'
  }, {
      id: '2',

      // Here we want the user
      // to enter input
      user: true,
      end : true
  }
];

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

    <button className='emo-btn'  onClick={toggleCam}>Use Camera</button>
    <button className='emo-btn' onClick={toggleText}>Use text</button>
    {isCam && <Camera/>}
    {isText && <ChatBot steps={steps} />}
  </div>
  )
}
