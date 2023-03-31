import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './FoundUsersBox.module.css'
import { useNavigate} from 'react-router-dom';
import axios from "axios";
export default function FoundUsersBox({ addedUsers, setAddedUsers, foundUser,setFoundUser}){
    const navigate= useNavigate()
    function arrayCheck(item,array)
    {
      return array.includes(item)
     
    }
    function removeFromAddedUsers(foundUser) {
      setAddedUsers(oldArray => oldArray.filter(user => user !== foundUser));
    }
    return(
      <div className={styles.cardContainer}>
      <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
      <h3>{foundUser.firstName} {foundUser.lastName}</h3>
      <button className={styles.pro} onClick={()=>  setFoundUser(null)}>X</button>
      <div className={styles.buttons}>
      <button onClick={() => setAddedUsers(oldArray =>
                            arrayCheck(foundUser, addedUsers)
                            ? oldArray.filter(user => user !== foundUser)
                            : [...oldArray, foundUser])} className={styles.primary}>
          {arrayCheck(foundUser,addedUsers)? 'remove' : 'add'}
          {/* arrayCheck(foundUser,addedUsers)?
          setAddedUsers(oldArray => [...oldArray, foundUser]):
          removeFromAddedUsers(foundUser)} className={styles.primary}>
          {arrayCheck(foundUser,addedUsers)? 'remove' : 'add'} */}
        </button>
        <button className={`${styles.primary} ${styles.ghost}`}>
          Follow
        </button>
      </div>
      <div className={styles.skills}>
        <h6>Top Genres</h6>
        <ul>
          {foundUser.top_five_genres.map((genre)=><li>{genre}</li>)}
        </ul>
      </div>
    </div>
    )
}