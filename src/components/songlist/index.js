import React from 'react';
import './songlist.css'
const SongList = ({ songs }) => {
  return (
    <div>
        {songs.map((song) => (
           <div className="song">
           <div className="thumbnail">
             <img src={song.thumbnail} alt={song.song_name} />
           </div>
           <div className="details">
             <h3>{song.song_name}</h3>
             <p>Artist: {song.artist}</p>
             <p>Duration: {song.duration}</p>
             <p>Emotion: {song.emotion}</p>
           </div>
         </div>
        ))}
    </div>
  );
};

export default SongList;