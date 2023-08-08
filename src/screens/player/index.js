import React , { useEffect, useState } from 'react';
import PlayMusic from '../../components/playmusic';
import './player.css'
import { useLocation } from "react-router-dom";

export default function Player() {
  const location = useLocation();
  const defaultId = "1foJKWWGoNbXjOWjDfroDoTbRoU8tqV-D";



  const idToUse = location.state?.id ?? defaultId;

  
  return (
    
    <div className='screen-container' ><PlayMusic id = {idToUse}/> </div>
  )
}
