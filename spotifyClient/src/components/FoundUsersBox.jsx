import { useEffect } from "react"
import defaultProfileImage from '../assets/userProfile.png'
import greenCheckmark from '../assets/checked.png'
import xMark from '../assets/x-mark.png'
import styles from './FoundUsersBox.module.css'
import { Link } from "react-router-dom"
import CheckmarkButton from "./CheckmarkButton"
import CloseButton from "./CloseButton"
export default function FoundUsersBox(props){
    useEffect(()=>console.log(props.users))
    return(
          <div className={styles.userCard}>
            <div className={styles.userHead}><h2>Search Results</h2></div>
            <div className={styles.userBody}>
            <div className={styles.profileImage}><img src={defaultProfileImage}/></div>
            <div className={styles.profileName}>
            <h2><Link>{props.users['firstName']} {props.users['lastName']}</Link></h2>
            </div>
            <div className={styles.profileButton}>
            <CheckmarkButton/>
            <CloseButton/>
            </div>
            </div>
          </div>
    )
}