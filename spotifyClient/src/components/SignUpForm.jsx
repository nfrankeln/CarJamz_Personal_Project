import './SignUpForm.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
export default function SignUpForm(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => axios.post('api/register/',{data});
    return(
        <div id="sign-up-form-body" >
            <form id="sign-up-form">
                <div id='name-wrapper'>
                <div className='input-wrapper'>
                <label htmlFor='first-name'>First Name</label>
                <input {...register("firstName" , { pattern: /^[A-Za-z]+$/i } )} id='first-name' type="text"/>
                </div>

                <div className='input-wrapper'>
                <label htmlFor='last-name'>Last Name</label>
                <input {...register("lastName" , { pattern: /^[A-Za-z]+$/i } )} id='last-name' type="text"/>
                </div>
                </div>
                <div className='input-wrapper'>
                <label htmlFor="email">Email</label>
                <input {...register("email")} id='email' type="email"/>
                </div>

                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                <input {...register("password")} id='password' type="text"/>
                </div>
                <div id='sign-up-button-wrapper'>
                <button onClick={handleSubmit(onSubmit)} id='sign-up-button'>Lets GO!</button>
                </div>
            </form>
        </div>

    )
}