import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './SearchBox.module.css'

export default function SearchBox({setFoundUser}){
    const { register, handleSubmit} = useForm();
    const [errorMessage,setErrorMessage] = useState(null)
    function onSubmit(searchData){
     axios.get('api/carjamz/users/',{
        params: {
          email: searchData['email']
        }
      })
    .then((response) => {if(response.data['found']){
        setFoundUser({
            'id':response.data['pk'],
            'firstName':response.data['first_name'],
            'lastName':response.data['last_name'],
            'top_five_genres':response.data['top_five_genre'],
            'profileImageUrl':response.data['profileImageUrl']})
    }
    
  else setErrorMessage(true)})}

    
    
    return(
      <>      <div class={styles.wrapper}>
        
  <div className={styles.label}>CarJamz User Lookup</div>
  <form  onSubmit={handleSubmit(onSubmit)} className={styles.searchBar}>
    <input {...register("email", {required:true})}  className={styles.searchQueryInput} placeholder="example@email.com"/>
    <button className={styles.searchQuerySubmit} name="searchQuerySubmit">
      <svg style={{ width: '2.4rem', height: '2.4rem' }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </button>
    </form>
  </div>
  </>

    )
}
