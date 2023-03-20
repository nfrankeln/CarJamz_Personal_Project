import axios from 'axios';
export function authorizeSpotify(){
    axios.get('api/spotify/authorize/')
    .then((response)=>window.location.replace(response.data.url))}