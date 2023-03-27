import './SignInForm.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate,redirect } from 'react-router-dom';



export default function SignInForm(){
    const nav= useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (loginData) => {
        try {
          const response = await axios.post("api/login/", { loginData });
          nav("../", { replace: true });
          nav(0)
        } catch (error) {
          // Handle the error here
          console.error(error);
        }
      };
      
    
    return(
        <div id="sign-in-form-container">
            <form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <div className='input-wrapper'>
                <label htmlFor="email">Email</label>
                <input {...register("email",{ required: true})} id='email' type="email"/>
                </div>
                {errors.email?.type === 'required' && <span>an email is required</span>}

                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                <input {...register("password",{required: true})} id='password' type="text"/>
                </div>
                {errors.password?.type === 'required' && <span>a password is required </span>}

                <div id='sign-up-button-wrapper'>
                <button className='sign-up-in-button'>Login</button>
                </div>
            </form>
        </div>
    )
}