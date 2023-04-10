import styles from './Modal.module.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import axios from 'axios'
import { accountInfoContext } from '../App'
import { useContext } from 'react'
export default function Modal({action,modalState}){
 const [,setAuthenticated] = useContext(accountInfoContext)
    const deleteUser = async () => {
        axios.delete('api/carjamz/users/')
        .then(response => console.log(response))
        .then(setAuthenticated(false))
        .then(window.location.reload())
     }


    return (<div className={`${styles.container} ${modalState && styles.active}`}>
        <div className={styles.modal}>
            <div className={styles.content}>
                <div className={styles.promptIcon}><AiOutlineCloseCircle/></div>
                <div className={styles.prompt}>
        <p>Are you sure?</p>
        <p>Do you really want to delete your account?<br/>This process cannot be undone</p>
        </div>
        <div className={styles.buttons}>
        <button className={`${styles.primary} ${styles.ghost}`} onClick={action}>Cancel</button>
        <button onClick={deleteUser} className={styles.primary}>Delete</button>
        </div>
        </div>
        </div>
    </div>)
}