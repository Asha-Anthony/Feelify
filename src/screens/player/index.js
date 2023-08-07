import React , { useEffect, useState } from 'react';
import PlayMusic from '../../components/playmusic';
import './player.css'
import { useLocation } from "react-router-dom";

export default function Player() {
  const location = useLocation();


  console.log("location "+location.state.id);
  
  return (
    <div className='screen-container' ><PlayMusic id = {location.state.id}/> </div>
  )
}
