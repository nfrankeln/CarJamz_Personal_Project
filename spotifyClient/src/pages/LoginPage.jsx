

import { useState } from 'react'
import LoginButtonToggle from '../components/LoginButtonToggle'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
import './LoginPage.css'
export default function LoginPage(props){
    
    const[showSignIn,setShowSignIn]=useState(true)
    const [error , showError]=useState(false)
    
    return(
            <div id='login-form-container'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <LoginButtonToggle showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
            {error && <span className='danger' style={{ marginLeft: '10px' }}>Invalid credentials</span>}
            </div>
            {showSignIn ? <SignInForm showError={showError}/>:<SignUpForm setAuthenticated={props.setAuthenticated}/>}
            </div>
        
    )
    
}