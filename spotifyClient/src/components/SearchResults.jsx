import styles from './SearchResults.module.css'
import { useNavigate} from 'react-router-dom';
import {FaPlus,FaMinus} from 'react-icons/fa'

export default function SearchResults({ addedUsers, setAddedUsers, foundUser,setFoundUser}){
    const navigate= useNavigate()
    function checkForID(addedUsers,foundUser){
    for(const item of addedUsers){
      if(item['id']===foundUser['id']){
        return true
      }}
    return false
    }
    return(
      <div className={styles.searchResult}>
        <div className={styles.profileImage}> 
      <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="" />
        </div>
        <div className={styles.profileInformationContainer}>
        <div className={styles.profileInformation}>
      <p className={styles.profileName}>{foundUser.firstName} {foundUser.lastName}</p>
      <p className={styles.topGenre}>{foundUser.top_five_genres[0]}</p>
      </div>
      <div className={styles.profileActionButton}>
        <button className={styles.addButton}
        // Check if user is in Added users array True:remove them False :Add them 
                onClick={() => {
                  checkForID(addedUsers,foundUser) ? 
                  setAddedUsers(addedUsers.filter(user => user.id !== foundUser.id)||[]) :
                  setAddedUsers([...addedUsers,foundUser]);
                  setFoundUser(null)
                  }}>
                <div>{checkForID(addedUsers,foundUser) ?<FaMinus/>:<FaPlus/>}</div></button>
      </div>
      </div>
      
    </div>
    )
}
     