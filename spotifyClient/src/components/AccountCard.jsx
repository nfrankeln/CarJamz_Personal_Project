import { useState,useContext } from 'react'
import styles from './AccountCard.module.css'
import Modal from './Modal'
import {FaRegTrashAlt} from 'react-icons/fa'
import { accountInfoContext } from '../App'
export default function AccountCard(){
    const [modalState,setModalState] =useState(false)
    function toggleModal(){
        setModalState(!modalState)
    }
    const accountInfo =  useContext(accountInfoContext);
    return(<>
        <div className={styles.accountCard}>
        <img className={styles.roundImage} src={accountInfo.profileImageUrl} alt="user" />
        <p>{accountInfo.firstName} {accountInfo.lastName}</p>
        <div className={styles.accountGenres}>
          <h6>Top Genres</h6>
          <ul>
            {accountInfo.top_five_genres.map((genre)=><li>{genre}</li>)}
          </ul>
          <div>
          <button className={styles.danger} onClick={toggleModal}>Delete Account <div><FaRegTrashAlt/></div>
          </button></div>
        </div>
        
      </div>
      <Modal action={toggleModal} modalState={modalState}/>
       </>
    )
}