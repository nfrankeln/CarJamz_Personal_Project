import styles from './FoundGenresCard.module.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react';
import GroupGenresList from './GroupGenresList';
import PlaylistGeneratorInstructions from './PlaylistGeneratorInstructions';
export default function FoundGenresCard({addedUsers,setFoundUser,commonGenres}){
    const [selectedId, setSelectedId] = useState();
    const handleItemClick = (id,index) => {
        setSelectedId(id);
        setFoundUser(addedUsers[index])
      }

    return(<>
        <div className={styles.cardContainer}>
            <h1>Playlist Generator</h1>
        <div className={styles.skills}>
        <h6>Groups Members</h6>
        <ul>
        
        {addedUsers.length > 0 && addedUsers.map((user,index) => (
          <li
            key={user.id}
            style={{
            backgroundColor: selectedId === user.id ? '#03bfcb' : 'inherit',
            color: selectedId === user.id ? 'black' : 'inherit'
            }}
            onClick={() => handleItemClick(user.id,index)}
          >
            {user.firstName} {user.lastName.substring(0, 1)}.
          </li>
        ))}
        {addedUsers.length === 0 && <p>Find some Friends to get started</p>}
        </ul>
        {addedUsers.length > 1 && <GroupGenresList commonGenres={commonGenres}/>}
        {addedUsers.length < 2 && <PlaylistGeneratorInstructions/>}
        <button className={styles.primary}>
          Get Your Playlist!
        </button>
        </div>
        
      </div>
      </>
    )
}