import axios from 'axios'
import { useEffect, useState } from 'react'
import Playlist from '../components/Playlist'
export default function ProfilePage(props){
    
    function authorizeSpotify(){
        axios.get('api/spotify/authorize/')
        .then((response)=>window.location.replace(response.data.url))}
        
    return(
    <div >
    {props.spotifyAuthorized?
    <div>

    <Playlist spotifyAuthorized={props.spotifyAuthorized}/>
    </div>
    :<button onClick={() => authorizeSpotify()}>Connect to Spotify</button>}
    </div>
        
    )
}