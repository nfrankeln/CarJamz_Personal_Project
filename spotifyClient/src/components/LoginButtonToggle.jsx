import { useEffect,useState } from 'react';
import './LoginButtonToggle.css'
export default function LoginButtonToggle(props){
  const selectedButton=props.selectedButton
  const setSelectedButton=props.setSelectedButton
    useEffect(()=>{
        if (selectedButton==null)
          setSelectedButton(document.querySelector(('.btn1')))
      },[])
      useEffect(() => {
        if (selectedButton !== null) {
          selectedButton.style.backgroundColor = '#20bead';
          selectedButton.style.color="white"
          selectedButton.style.zIndex="2"
        }
      }, [selectedButton]);
    function buttonColor(event){
        let button = event.currentTarget;
         if (selectedButton!==button){selectedButton.style.backgroundColor = '#ddf0f0'
         selectedButton.style.color="black"
         selectedButton.style.zIndex="1"}
        setSelectedButton(button)
        }
    return(
        <div className="btn-container">
        <button className="login-btn-toggle btn1" onClick={(e)=>buttonColor(e)}><p>Sign In</p></button>
        <button className="login-btn-toggle btn2" onClick={(e)=>buttonColor(e)}><p>Sign Up</p></button>
       </div>
    )
}