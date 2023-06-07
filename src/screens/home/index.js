import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Library from '../library';
import Player from '../player';
import Trending from '../trending';

import './home.css';
import Sidebar from '../../components/sidebar';
import Emotions from '../emotions';
import Login from '../auth/login/login';
export default function Home() {
  const token = true;
  return !token ? (
    <Login />
  ) :  (
    <Router>
        <div className='main-body'>
          <Sidebar/>
        <Routes>
            <Route path="/" element={<Library/>}/>
            <Route path="/player" element={<Player/>}/>
            <Route path="/trending" element={<Trending/>}/>
            <Route path="/emotions" element={<Emotions/>}/>
            <Route path="/library" element={<Library/>}/>
        </Routes>
        </div>
    </Router>

  )
}
