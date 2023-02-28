import './SignUpForm.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
export default function SignUpForm(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => axios.post('api/register/',{data});
    return(
        <div id="sign-up-form-body" >
            <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
                
                <div id='name-wrapper'>
                
                <div className='input-wrapper'>
                <label htmlFor='first-name'>First Name</label>
                <input {...register("firstName" , {pattern: /^[A-Za-z]+$/i } )} id='first-name' type="text"/>
                </div>
                
                <div className='input-wrapper'>
                <label htmlFor='last-name'>Last Name</label>
                <input {...register("lastName" , { pattern: /^[A-Za-z]+$/i } )} id='last-name' type="text"/>
                </div>

                </div>
                {(errors.firstName?.type === 'pattern' || errors.lastName?.type === 'pattern') && <span>Your name may only contain letters</span>}
            
                <div className='input-wrapper'>
                <label htmlFor="email">Email</label>
                <input {...register("email",{ required: true})} id='email' type="email"/>
                </div>

                {errors.email?.type === 'required' && <span>an email is required</span>}

                <div className='input-wrapper'>
                <label htmlFor="password">Password</label>
                <input {...register("password",{required: true, minLength: 4})} id='password' type="text"/>
                </div>
                {errors.password?.type === 'required' && <span>A password is required </span>}
                {errors.password?.type === 'minLength' && <span>password must be at least 4 charachters</span>}

                <div id='sign-up-button-wrapper'>
                <button className='sign-up-in-button'>Create Account</button>
                </div>
            </form>
            
        </div>

    )
}