import { useEffect,useState } from 'react';
import './LoginButtonToggle.css'
export default function LoginButtonToggle({showSignIn, setShowSignIn}){
  // const selectedButton=props.selectedButton
  // const setSelectedButton=props.setSelectedButton
    // useEffect(()=>{
    //     if (selectedButton==null)
    //       setSelectedButton(document.querySelector(('.btn1')))
    //   },[])
    //   useEffect(() => {
    //     if (selectedButton !== null) {
    //       selectedButton.style.backgroundColor = '#20bead';
    //       selectedButton.style.color="white"
    //       selectedButton.style.zIndex="2"
    //     }
    //   }, [selectedButton]);
    
    return(
        <div className="btn-container">
        <button className={showSignIn ? "btn1" : "btn2"  } onClick={()=>setShowSignIn(!showSignIn)}>Sign In</button>
        <button className={showSignIn ? "btn2" : "btn1"  } onClick={()=>setShowSignIn(!showSignIn)}>Sign Up</button>
       </div>
    )
}