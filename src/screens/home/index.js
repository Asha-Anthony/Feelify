import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Library from '../library';
import Player from '../player';
import Trending from '../trending';
import App from '../../App';

import './home.css';
import Sidebar from '../../components/sidebar';
import Emotions from '../emotions';
import Login from '../auth/login';
export default function Home(props) {
  return (
    <Router>
        <div className='main-body'>       
          <Sidebar/>
        <Routes>
            <Route path="/" element={<Emotions/>}/>
            <Route path="/player" element={<Player/>}/>
            <Route path="/trending" element={<Trending/>}/>
            <Route path="/emotions" element={<Emotions/>}/>
            <Route path="/library" element={<Library username={props.username}/>}/>
           
        </Routes>
        </div>
    </Router>

  )
}
