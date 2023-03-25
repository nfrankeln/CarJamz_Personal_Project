import crowd from '../assets/crowd.png'
import number4 from'../assets/number4.svg'
import './HomePage.css'
import { FaSpotify,FaPeopleArrows,FaLessThan } from 'react-icons/fa';
import {MdOutlinePlaylistAddCheckCircle} from 'react-icons/md'
import {RiAccountBoxLine} from 'react-icons/ri'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {authorizeSpotify} from '../utils/authorizeSpotify'
export default function HomePage(props){
    const [step,setStep] = useState(1)
    useEffect(()=>{
        console.log(props)
        if(props.authenticated){
            setStep(prevstep => prevstep+ 1)}
        // if(props.spotifyAuthorized){
        //     setStep(prevstep => prevstep + 1)
        // }
    }
        ,[props.authenticated,props.spotifyAuthorized])
    return (
    <div className='container'>
        <div className="header">
            <p>Mix the perfect playlist for your next road trip</p>
            <p>in <p id='colored-word'>four</p> easy steps</p>  
        </div>

        
        <div className='main'>
        <ul className='icons'>
               
                <li className='icon'>    
                    <RiAccountBoxLine/>
                    <div>{step === 1 ? <Link to="/login">Create Account</Link> : <p>Create Account</p>}</div>
                    {step === 1 && <div className='step'><FaLessThan/></div>}
                </li>

                <li className='icon'>
                    <FaSpotify/>
                    <div>{step === 2 ? <button onClick={() => authorizeSpotify()}>Connect Spofity</button> :<p>Connect Spofity</p>}</div>
                    {step === 2 && <div className='step'><FaLessThan/></div>}
                </li>
                
    
            
                <li className='icon'>
                    <FaPeopleArrows/>
                    <div><p>Compare Intrests</p></div>
                    {step === 3 && <div className='step'><FaLessThan/></div>}
                </li>
                  
              
       
                <li className='icon'>
                    <MdOutlinePlaylistAddCheckCircle/>
                    <div><p>Generate Playlists</p></div>
                    {step === 4 && <div className='step'><FaLessThan/></div>}
                </li>
            
        </ul>
        
        </div> 
        <div id='footer'>
        <img src={crowd} alt="" />
        
        </div>
        
        </div>
        )
}