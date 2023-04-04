import crowd from '../assets/crowd.png'
import './HomePage.css'
import { FaSpotify,FaPeopleArrows,FaGreaterThan } from 'react-icons/fa';
import {MdOutlinePlaylistAddCheckCircle} from 'react-icons/md'
import {RiAccountBoxLine} from 'react-icons/ri'
import {GiCheckMark} from 'react-icons/gi'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {authorizeSpotify} from '../utils/authorizeSpotify'
export default function HomePage({users,setUsers,authenticated,spotifyAuthorized}){

    const [step,setStep] = useState(1)
    useEffect(()=>{
        if(authenticated){
            setStep(prevstep => prevstep+ 1)}
        if(spotifyAuthorized){
            setStep(prevstep => prevstep + 1)
        if(users){
            setStep(prevstep => prevstep +1)
        }
        }
    }
        ,[authenticated,spotifyAuthorized])
    
    return (
    <div className='container'>
        <div className="header">
            <p>Mix the perfect playlist for your next road trip</p>
            <p>in <p id='colored-word'>four</p> easy steps</p>  
        </div>

        
        <div className='main'>
        <ol className='icons'>
            <div className='listwrap'>
                {(step === 1 ? <div className='step'><FaGreaterThan/></div>: <div className='step'></div>) }  
                <li>
                <div className='icon'>
                    <div><RiAccountBoxLine/></div>
                    <div>{step === 1 ? <Link to="/login">Create Account</Link> : <p className='strikethrough'>Create Account</p>}</div>
                    </div>
                {step > 1 ? <div className='checkmark'><GiCheckMark/></div>:<div className='checkmark'></div> } 
                </li>
            </div>
                
            <div className='listwrap'>
            {step === 2 && <div className='step'><FaGreaterThan/></div>}
            {((step < 2) || (step > 2)) && <div className='step'></div> }
            
                <li>
                    <div className='icon'>
                    <div><FaSpotify/></div>
                    <div>
                         {step === 2 && <button onClick={() => authorizeSpotify()}>Connect Spotify</button>}
                         {step < 2  && <p>Connect Spotify</p>}
                         {step > 2  && <p className='strikethrough'>Connect Spotify</p>}
                    </div>
                    </div>
                    {step > 2? <div className='checkmark'><GiCheckMark/></div>:<div className='checkmark'></div> }
                </li>
            </div>
                
    
            <div className='listwrap'>
            {step === 3 && <div className='step'><FaGreaterThan/></div>}
            {((step < 3) || (step > 3)) && <div className='step'></div> }
            
                <li>
                    <div className='icon'>
                    <div><FaPeopleArrows/></div>
                    <div><Link to="collaberate">Compare Intrests</Link></div>
                    </div>
                    {step > 3? <div className='checkmark'><GiCheckMark/></div>:<div className='checkmark'></div> }
                </li>
            </div>
                  
              
            <div className='listwrap'>
            {step === 4 && <div className='step'><FaGreaterThan/></div>}
            {step < 4  && <div className='step'></div> }
            
                <li>
                <div className='icon'>
                    <div><MdOutlinePlaylistAddCheckCircle/></div>
                    <div><p>Generate Playlists</p></div>
                </div>
                {step > 4? <div className='checkmark'><GiCheckMark/></div>:<div className='checkmark'></div> } 
                </li>
            </div>
        </ol>
        
        </div> 
        <div id='footer'>
        <img src={crowd} alt="" />
        
        </div>
        
        </div>
        )
}