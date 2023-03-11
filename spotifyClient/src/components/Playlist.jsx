import axios from 'axios';
import { useState, useEffect } from 'react';
import './Playlist.css'

export default function topTenSongs(props){
    const [topTenSongs,setTopTenSongs] = useState(false)

    useEffect(()=>{
        if(props.spotifyAuthorized){userTopTenSongs()}},[])

    function userTopTenSongs(){
        axios.get('api/spotify/top-songs/')
        .then(response => {console.log(response.data.items);setTopTenSongs(response.data.items)})
    }
    return(
    <div id='playlist-card'>
        <div id="playlist-header">
            <h2>Your Top Songs</h2>
        </div>
        {topTenSongs?
        <div id="playlist-body">    
        {topTenSongs.map((song) => 
          <div className="playlist-item">
            <div><img className="playlist-image" src={song['album']['images'][1]['url']} /></div>
            <div className='playlist-item-text'>
                <div><p className='primary-font'>{song['name']}</p></div>
                <div><p className='secondary-font'>{song['artists'][0]['name']}</p></div>
            </div>
            </div>)}
        </div>
      :null}
      </div> 
    )
}