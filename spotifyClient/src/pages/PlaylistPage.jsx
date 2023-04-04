import { useLocation } from "react-router-dom";
import styles from './PlaylistPage.module.css'
import {millisToMinutesAndSeconds} from '../utils/timeConversion.js'
import {FaVolumeMute,FaVolumeUp} from 'react-icons/fa'
import {GrPowerReset} from 'react-icons/gr'
import {CgPlayTrackPrev,CgPlayTrackNext,CgPlayPause,CgPlayButton} from 'react-icons/cg'
export default function PlaylistPage(){
    const location = useLocation();
    const tracks = location.state && location.state.tracks ? location.state.tracks : [];
    console.log(location.state.tracks);
    return(<>
            <div className={styles.playlist}>
         <div className={styles.mediaPlayer}>
            <div className={styles.nowPlaying}>
                <div className={styles.action}>Now Playing...</div>
                <div className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, necessitatibus?</div>
            </div>
            <div className={styles.audioWrap}>
            <div className={styles.controls}>
                <div className={styles.iconWrapper}><CgPlayButton/></div>
                <div className={styles.slider}><input type="range"/></div><div>00:05/3:28</div> 
                <div className={styles['volume-controls']}>
                    <div className={styles.iconWrapperFA}><FaVolumeUp/></div>
                    <div className={styles.slider}><input className={styles.volumeSlider} type="range"/></div>
                 </div>
            </div>
            <div className={styles['navigate-tracks']}>
                <div className={styles.iconWrapper}><CgPlayTrackPrev/></div>
                <div className={styles.iconWrapper}><CgPlayTrackNext/></div>
                <div>save playlist</div>
            </div>
            </div>
            
         </div>






        
            <ol>
            {tracks.map((track,index) => (
                <li className={styles.track} key={track.id}>
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

