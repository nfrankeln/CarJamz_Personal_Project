import { useState, useReducer, useEffect} from "react";
import { useForm } from 'react-hook-form';
import { Outlet, useNavigate} from 'react-router-dom';
import styles from './GenresSelectionForm.module.css'
import axios from 'axios';
export default function GenresSelectionForm({commonGenres,addedUsers}) {
    const navigate = useNavigate()
    const { register, handleSubmit,setError, reset, watch, formState: { errors,isSubmitting } } = useForm({ defaultValues: { checkboxes: {} } });
    const checkboxes = watch('checkboxes');
    const numberOfGenresSelected =(Object.values(checkboxes).filter(item => item !=false).length)

    const [data,setData]=useState(false)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
      if (loading && data) {
        console.log(data)
        navigate('playlist', { state: {tracks:data} });
      }
    }, [loading, data]);
//reset checkboxes when a user is added or removed
    useEffect(()=>
    reset()
    ,[addedUsers])
//  
async function getData(data){
  setLoading(true)
 await axios.post('api/reccomendation/',data)
      .then(response=>setData(response['data']))
}
const [GenreError,setGenreError]=useState(false)
const onSubmit = (data) => {
  if (numberOfGenresSelected === 0) {
    setGenreError(true);
    setTimeout(() => {
      setGenreError(false);
    }, 1000);
  } else {
    getData(data)
  }
};

useEffect(()=>{
  if(numberOfGenresSelected > 0){setGenreError(false)}
},[isSubmitting,numberOfGenresSelected])
    return (
      <>
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
      </>
    );
  }
