import React from 'react'
import { useState } from "react";
import Camera from '../../components/camera/camera';
import "./emotions.css";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import bot from './bot.png'
const steps = [
  {
    id: '0',
    message: 'Hey there!',
    trigger: '1',
  }, {
    id: '1',
    message: 'Welcome back to Feelify !',
    trigger: '2'
  },
  {
    id: '2',
    message: 'Can you breifly describe your day so far',
    trigger: '3'
  },
  {
    id: '3',
    user: true,
    trigger: '4'
  },
  {
    id: '4',
    message: 'Thank you. Please wait while I analyze.',
    end: true
  }

];
const config = {
  botAvatar: {bot},
  
};
const theme = {
  background: '#e3e2df',
  headerBgColor: "#5d001e",
  headerFontSize: '20px',
  botBubbleColor: '#e3afbc',
  headerFontColor: '#e3afbc',
  botFontColor: '#e3e2df',
  userBubbleColor: '#e3e2df',
  userFontColor: '#e3afbc',
};

export default function Emotions() {




  const [isCam, setIsCam] = useState(false);
  const [isText, setIsText] = useState(false);

  function toggleCam() {
    setIsCam((isCam) => !isCam);
    if (!isCam) {
      setIsText((false));
    }
  }
  function toggleText() {
    setIsText((isText) => !isText);
    if (!isText) {
      setIsCam((false));
    }
  }
  return (
    <div className='screen-container'>
      <div class="split left">
  <div class="centered">
 
  {isCam ?(<Camera />):( <button className='emo-btn' onClick={toggleCam}>Use Camera</button>)}
  </div>
</div>

<div class="split right">
  <div class="centered">
  {isText? (<ThemeProvider theme={theme}><ChatBot className="chatbot" headerTitle="Check In bot"steps={steps} /></ThemeProvider> ):(  <button className='emo-btn' onClick={toggleText}>Use text</button>)}
  </div>
</div>

  
    
     
    </div>
  )
}
