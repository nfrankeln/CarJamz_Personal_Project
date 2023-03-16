import axios from 'axios'
import { useEffect, useState } from 'react'
import AuthorizationPrompt from '../components/AuthorizationPrompt'
import Playlist from '../components/Playlist'
export default function ProfilePage(props){
    const [topGenre,setTopGenre] = useState(false)
    
    function topGenreArtist(){
        axios.get('api/gernre-artist/').then(response=> setTopGenre(response.data['top genre']))
    }
    useEffect(()=>{
        if (props.spotifyAuthorized){
        topGenreArtist()}},[])
    return(
    <div>
    {props.spotifyAuthorized?
    
    <div>
        <p>Favorite Genre:{topGenre}</p>
        <Playlist spotifyAuthorized={props.spotifyAuthorized}/></div>
    :
        <AuthorizationPrompt/>}
    </div>
        
    )
}