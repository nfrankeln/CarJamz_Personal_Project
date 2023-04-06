

import { useState } from 'react'
import LoginButtonToggle from '../components/LoginButtonToggle'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
import './LoginPage.css'
export default function LoginPage(props){
    
    const[showSignIn,setShowSignIn]=useState(true)
    
    return(
            <div id='login-form-container'>
            <LoginButtonToggle showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
            {showSignIn ? <SignInForm/>:<SignUpForm setAuthenticated={props.setAuthenticated}/>}
            </div>
        
    )
    
}