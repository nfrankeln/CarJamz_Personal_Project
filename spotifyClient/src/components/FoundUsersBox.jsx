import { useEffect } from "react"
import styles from './FoundUsersBox.module.css'
export default function FoundUsersBox(props){
    useEffect(()=>console.log(props.users))
    return(
      <div className={styles.cardContainer}>
      <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
      <h3>Netanel Frankel</h3>
      <span className={styles.pro}>X</span>
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
          <li>Pop</li>
          <li>Rock</li>
          <li>Metal</li>
          <li>Rap</li>
          <li>Country</li>
        </ul>
      </div>
    </div>
    )
}