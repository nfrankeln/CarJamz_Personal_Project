import { useEffect } from "react"
import defaultProfileImage from '../assets/userProfile.png'
import greenCheckmark from '../assets/checked.png'
import xMark from '../assets/x-mark.png'
import './FoundUsersBox.css'
import { Link } from "react-router-dom"
import CheckmarkButton from "./CheckmarkButton"
import CloseButton from "./CloseButton"
export default function FoundUsersBox(props){
    useEffect(()=>console.log(props.users))
    return(
          <div id="user-card">
            <div id="user-head">Is this your friend?</div>
            <div id='user-body'>
            <div id="profile-image"><img src={defaultProfileImage}/></div>
            <div id="profile-name">
            <h2><Link>{props.users['firstName']} {props.users['lastName']}</Link></h2>
            </div>
            <div id="profile-button">
            <CheckmarkButton/>
            <CloseButton/>
            </div>
            </div>
          </div>
    )
}