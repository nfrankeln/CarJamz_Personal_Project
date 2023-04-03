import { useState, useReducer, useEffect} from "react";
import { useForm } from 'react-hook-form';
import styles from './GenresSelectionForm.module.css'
import axios from 'axios';
export default function GenresSelectionForm({commonGenres,addedUsers}) {
    const { register, handleSubmit,setError, reset, watch, formState: { errors,isSubmitting } } = useForm({ defaultValues: { checkboxes: {} } });
    const checkboxes = watch('checkboxes');
    const numberOfGenresSelected =(Object.values(checkboxes).filter(item => item !=false).length)
//reset checkboxes when a user is added or removed
    useEffect(()=>
    reset()
    ,[addedUsers])
//  
const [GenreError,setGenreError]=useState(false)
const onSubmit = (data) => {
  if (numberOfGenresSelected === 0) {
    setGenreError(true);
    setTimeout(() => {
      setGenreError(false);
    }, 1000);
  } else {
    axios.post('api/reccomendation/',data)
    .then((response)=>console.log(response));
  }
};

useEffect(()=>{
  if(numberOfGenresSelected > 0){setGenreError(false)}
},[isSubmitting,numberOfGenresSelected])
    return (
      <div>
        <div className={styles.header}><h6>Groups Top Genres </h6> <p className={styles.counter}><p className={GenreError ? styles.bounce : null}>{numberOfGenresSelected}</p>/<p className={styles.styledNumber}>5</p></p></div> 
        <form className={styles['selected-genres-form']} onSubmit={handleSubmit(onSubmit)} >
          <ul>
        {commonGenres && commonGenres.map(genre => (
        <li className={styles.test} key={genre}>
            <input type="checkbox" id={genre} value={genre}
             {...register(`checkboxes.${genre}` )}
             disabled={checkboxes && Object.values(checkboxes).filter(cb => cb).length >= 5 && !checkboxes[genre]}
             />
            <label className={styles['genre']} htmlFor={genre}>{genre}</label>
        </li>))
        }
          </ul>
          <button className={styles.primary}>
                    Get Your Playlist!
        </button>
        </form>
      </div>
    );
  }
