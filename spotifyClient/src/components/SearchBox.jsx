import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './SearchBox.module.css'
import { GoSearch } from 'react-icons/go';
// import {getPixelColor,getOffset} from '../utils/getPixelColor'
export default function SearchBox(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage,setErrorMessage] = useState(null)
    const onSubmit = searchData => axios.get('api/carjamz/users/',{
        params: {
          email: searchData['email']
        }
      })
    .then((response) => {if(response.data['found']){
        props.setUsers({
            'url':`${response.data['pk']}`,
            'firstName':response.data['first_name'],
            'lastName':response.data['last_name']})
            props.handleStateChange(2)
    }
  else setErrorMessage(true)})

    
    
    return(
      <div className={styles.searchCard}>
        <div className={styles.searchHeader}>
          <h2 className="prompt-font">USER LOOKUP</h2>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.searchBody}>
        <div>{errorMessage === true  && <p className={styles.errorMessage}>We Couldn't Find A User with that Email</p>}</div>
        
    <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email",{ required: true})}  placeholder="Search by Email" type="email"/>
        <button><GoSearch /></button>
    </form>
    
    </div>
    </div>)
}