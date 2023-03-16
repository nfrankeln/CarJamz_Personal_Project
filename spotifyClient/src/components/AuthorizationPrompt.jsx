import './AuthorizationPrompt.css'
import axios from "axios";
export default function AuthorizationPrompt(){
    function authorizeSpotify(){
        axios.get('api/spotify/authorize/')
        .then((response)=>window.location.replace(response.data.url))}
    return(
        <div id="authorize-card">
            <div id="authorize-body">
            <p>Authorize our app to access your Spotify data.</p>
            <p>This will allow us to provide you with recommendations 
                based on your listening habits.</p>
            </div>
            <div id="authorize-footer">
            <button id="authorize-button" onClick={() => authorizeSpotify()}>Connect to Spotify</button>
            </div>
        </div>
    )
}