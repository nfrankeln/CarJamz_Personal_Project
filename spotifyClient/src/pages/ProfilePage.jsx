import axios from 'axios'
import { useEffect } from 'react'
export default function ProfilePage(props){
    function getUrl(){
        axios.get('api/spotify/authorize/')
        .then((response)=>window.location.replace(response.data.url))

    }
    console.log(props)
    return(
    <div>
    <p>ProfilePage</p>
    <button onClick={()=>getUrl()} >Connect to Spotify</button>
    </div>
        
    )
}