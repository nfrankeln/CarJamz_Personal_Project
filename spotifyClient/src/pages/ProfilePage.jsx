import axios from 'axios'
import { useEffect, useState } from 'react'
import Playlist from '../components/Playlist'
export default function ProfilePage(props){
    const [topTenSongs,setTopTenSongs] = useState(false)
    function authorizeSpotify(){
        axios.get('api/spotify/authorize/')
        .then((response)=>window.location.replace(response.data.url))

    }
    function userTopTenSongs(){
        axios.get('api/spotify/top-songs/')
        .then(response => {console.log(response.data.items);setTopTenSongs(response.data.items)})
    }
    useEffect(()=>{
        if(props.spotifyAuthorized){userTopTenSongs()}},[])
    return(
    <div>
    {props.spotifyAuthorized?
    <div>
    {topTenSongs?
    <Playlist songs={topTenSongs}/>
    :null}
    </div>
    :<button onClick={() => authorizeSpotify()}>Connect to Spotify</button>}
    </div>
        
    )
}