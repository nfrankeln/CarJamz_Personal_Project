import axios from "axios";
import { useForm } from "react-hook-form";
import './SearchBox.css'
export default function SearchBox(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = searchData => axios.get('api/carjamz/users/',{
        params: {
          email: searchData['email']
        }
      })
    .then((response) => {if(response.data['found']){
        props.setUsers({
            'url':`${response.data['pk']}`,
            'firstName':response.data['first_name'],
            'lastName':response.data['last_name']
    })
    }})
    
    
    
    return(
      <div id="search-card">
        <div id="search-header">
          <h2>ENTER ANOTHER USERS EMAIL</h2>
        </div>
        <div id="search-body">
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email",{ required: true})} id='email' placeholder="Search by Email" type="email"/>
        <button>Search</button>
    </form>
    </div>
    </div>)
}