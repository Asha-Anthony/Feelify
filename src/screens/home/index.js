import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Library from '../library';
import Player from '../player';
import Trending from '../trending';

import './home.css';
import Sidebar from '../../components/sidebar';
import Emotions from '../emotions';
export default function Home() {
  return (
    <Router>
        <div className='main-body'>
          <Sidebar/>
        <Routes>
            <Route path="/" element={<Library/>}/>
            <Route path="/player" element={<Player/>}/>
            <Route path="/trending" element={<Trending/>}/>
            <Route path="/emotion" element={<Emotions/>}/>
        </Routes>
        </div>
    </Router>

  )
}
