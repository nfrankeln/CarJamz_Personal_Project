import { useState } from 'react';
import styles from './GroupUsers.module.css'
export default function({addedUsers,setFoundUser}){
    const [selectedId, setSelectedId] = useState();
    const handleItemClick = (id,index) => {
        setSelectedId(id);
        setFoundUser(addedUsers[index])
      }
    return(
        <div>
        <div className={styles.header}>
        <h6>Groups Members</h6>
        </div>
        <ul>
        
        {addedUsers.length > 0 && addedUsers.map((user,index) => (
          <li
            className={styles.groupMember}
            key={user.id}
            style={{
            backgroundColor: selectedId === user.id ? 'aquamarine' : 'inherit',
            color: selectedId === user.id ? '#1f1a36' : 'white'
            }}
            onClick={() => handleItemClick(user.id,index)}
          >
            {user.firstName} {user.lastName.substring(0, 1)}.
          </li>
        ))}
      
        </ul>
        </div>
    )
}