import { useState } from 'react'
import styles from './AccountCard.module.css'
import Modal from './Modal'
import {FaRegTrashAlt} from 'react-icons/fa'
export default function AccountCard({foundUser}){
    const [modalState,setModalState] =useState(false)
    function toggleModal(){
        setModalState(!modalState)
    }
    return(<>
        <div className={styles.cardContainer}>
        <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
        <p>{foundUser.firstName} {foundUser.lastName}</p>
        <div className={styles.skills}>
          <h6>Top Genres</h6>
          <ul>
            {foundUser.top_five_genres.map((genre)=><li>{genre}</li>)}
          </ul>
          <div>
          <button className={styles.danger} onClick={toggleModal}>Delete <div><FaRegTrashAlt/></div>
          </button></div>
        </div>
        
      </div>
      <Modal action={toggleModal} modalState={modalState}/>
       </>
    )
}