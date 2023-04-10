import './SignInForm.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';



export default function SignInForm(props){
    const nav= useNavigate()
    const [error , showError]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (loginData) => {
        try {
          const response = await axios.post("api/login/", { loginData });
          console.log(response)
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          else{
            nav("../", { replace: true });
          nav(0)
          }
          
        } catch (error) {
          // Handle the error here
          console.error(error);
          props.showError(true)
          
        }
      };
      
    
    return(
        <div id="sign-in-form-container">
            <form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <div className='input-wrapper'>
                <label htmlFor="email">Email
                {errors.email?.type === 'required' && <span className='danger' style={{ marginLeft: '1rem' }}>an email is required</span>}
                </label>
                <input {...register("email",{ required: true})} id='email' type="email"/>
                </div>
                

                <div className='input-wrapper'>
                    <label htmlFor="password">Password
                    {errors.password?.type === 'required' && <span className='danger' style={{ marginLeft: '1rem' }}>a password is required </span>}
                    </label> 
                <input {...register("password",{required: true})} id='password' type="text"/>
                </div>
                

                <div id='sign-up-button-wrapper'>
                <button className='sign-up-in-button'>Login</button>
                </div>
            </form>
            
        </div>
    )
}