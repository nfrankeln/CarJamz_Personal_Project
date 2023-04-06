import { useLocation } from "react-router-dom";
import styles from './PlaylistPage.module.css'
import {millisToMinutesAndSeconds} from '../utils/timeConversion.js'
import {FaVolumeMute,FaVolumeUp} from 'react-icons/fa'
import {CgPlayTrackPrev,CgPlayTrackNext,CgPlayPause,CgPlayButton} from 'react-icons/cg'
import { useEffect,useState,useRef } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import { useForm } from "react-hook-form";
import axios from "axios";
export default function PlaylistPage(){
    const location = useLocation();
    const tracks = location.state && location.state.tracks ? location.state.tracks : [];
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [externalLink,setExternalLink]=useState(false)
    const onSubmit = (data) => {
        data['uris']=uris
        console.log(data['uris'])
        axios.post("/api/spotify/playlists/create/", data)
          .then(response => setExternalLink(response.data['url']))
          .catch(error => console.error(error))
      }
    

      

    

    const uris = [];

    tracks.forEach((myObj) => 
    {Object.entries(myObj).forEach(([key, value]) => 
        {if (key === 'uri') {uris.push(value);}});});

    return(<>
            <div className={styles.playlist}>
              <form className={styles.savePlaylist} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("playlistName",{ required: true})} placeholder="Name Your Playlist"/>
                {externalLink?<a href={externalLink} target="_blank">SEE IT ON SPOTIFY</a>:<button type="submit">SAVE PLAYLIST</button>}
                
                </form>
               <SpotifyPlayer 
                token={location.state.token}
                uris={uris}
                offset={currentSongIndex}
                styles={{
                    activeColor: '#fff',
                    bgColor: '#28223f',
                    color: '#FFFFFF',
                    loaderColor: '#FFFFFF',
                    sliderColor: '#7fffd4',
                    sliderHandleColor:'#fff',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                  }}
                />   
            <ol>
            {tracks.map((track,index) => (
                <li onClick={()=>setCurrentSongIndex(index)}  className={styles.track} key={track.id}>
                    <div>{index + 1}</div>
                    <div className={styles['track-details']}>
                    <div className={styles['name-container']}>
                        {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
                    </div>
                    <div className={styles.time}>{millisToMinutesAndSeconds(track.duration_ms)}</div>
</div>
                  
                </li>))}
            </ol>
        </div>
        </>
    )
}
