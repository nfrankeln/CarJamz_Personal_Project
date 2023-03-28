import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './SearchBox.module.css'

export default function SearchBox(props){
    const { register, handleSubmit} = useForm();
    const [errorMessage,setErrorMessage] = useState(null)
    const onSubmit = searchData => console.log(searchData)
  //    axios.get('api/carjamz/users/',{
  //       params: {
  //         email: searchData['email']
  //       }
  //     })
  //   .then((response) => {if(response.data['found']){
  //       props.setUsers({
  //           'url':`${response.data['pk']}`,
  //           'firstName':response.data['first_name'],
  //           'lastName':response.data['last_name']})
  //           props.handleStateChange(2)
  //           .then(console.log('users'))
  //   }
    
  // else setErrorMessage(true)})

    
    
    return(
      <div class={styles.wrapper}>
        
  <div className={styles.label}>CarJamz User Lookup</div>
  <form  onSubmit={handleSubmit(onSubmit)} className={styles.searchBar}>
    <input {...register("email")}  className={styles.searchQueryInput} placeholder="Email or Name"/>
    <button className={styles.searchQuerySubmit} name="searchQuerySubmit">
      <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </button>
    </form>
  </div>

    )
}
