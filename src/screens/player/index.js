import React , { useEffect, useState } from 'react';
import PlayMusic from '../../components/playmusic';
import './player.css'
import { useLocation } from "react-router-dom";

export default function Player() {
  const location = useLocation();
  const defaultId = "1Y-CpDfjNKK2SL_W5u2ZEwj6S7bVvNPyY";



  const idToUse = location.state?.id ?? defaultId;

  
  return (
    
    <div className='screen-container' ><PlayMusic id = {idToUse}/> </div>
  )
}
