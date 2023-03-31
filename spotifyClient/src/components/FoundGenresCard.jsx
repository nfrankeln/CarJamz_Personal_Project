import styles from './FoundGenresCard.module.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react';
export default function FoundGenresCard({addedUsers,setFoundUser,commonGenres}){
    const [selectedId, setSelectedId] = useState(null);
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
        {addedUsers.map((user,index) => (
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
        </ul>
      </div>
        <div className={styles.skills}>
        <h6>Groups Top Genres (select up to 5)</h6>
        <ul>
          {commonGenres.map(genre=><li>
            {genre}
          </li>)}
        </ul>
        </div>
        <button className={styles.primary}>
          Get Your Playlist!
        </button>
      </div>
      </>
    )
}