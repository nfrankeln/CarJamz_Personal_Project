

import { useState } from 'react'
import LoginButtonToggle from '../components/LoginButtonToggle'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
import './LoginPage.css'
export default function LoginPage(){
    
    const[selectedButton,setSelectedButton]=useState(null)
    return(
        <div id='login-page-container'>
            <div id='login-form-container'>
            <LoginButtonToggle selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>
            {selectedButton==document.querySelector(('.btn1'))?<SignInForm/>:<SignUpForm/>}
            </div>
        </div>
    )
    
}