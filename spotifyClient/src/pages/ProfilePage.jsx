import axios from 'axios'
import { useEffect } from 'react'
export default function ProfilePage(props){
    function authorizeSpotify(){
        axios.get('api/spotify/authorize/')
        .then((response)=>window.location.replace(response.data.url))

    }
    function userTopTenSongs(){
        axios.get('api/spotify/top-songs/')
        .then(response => console.log(response))
    }
    useEffect(()=>{
        if(props.spotifyAuthorized){userTopTenSongs()}},[])
    return(
    <div>
    {props.spotifyAuthorized?<p>Your top 10</p>:<button onClick={()=>authorizeSpotify()} >Connect to Spotify</button>}
    </div>
        
    )
}