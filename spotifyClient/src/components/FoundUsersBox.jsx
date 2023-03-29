import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './FoundUsersBox.module.css'
export default function FoundUsersBox(props){
    useEffect(()=>console.log(props.users))
    return(
      <div className={styles.cardContainer}>
      <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
      <h3>{props.users.firstName} {props.users.lastName}</h3>
      <button className={styles.pro} onClick={()=> props.setUsers(null)}>X</button>
      <div className={styles.buttons}>
        <button className={styles.primary}>
          Add
        </button>
        <button className={`${styles.primary} ${styles.ghost}`}>
          Follow
        </button>
      </div>
      <div className={styles.skills}>
        <h6>Top Genres</h6>
        <ul>
          {props.users.top_five_genres.map((genre)=><li>{genre}</li>)}
        </ul>
      </div>
    </div>
    )
}