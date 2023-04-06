import './SignUpForm.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SignUpForm(props){
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = signUpData => axios.post('api/register/',{signUpData})
    .then(response => props.setAuthenticated(response.data['success']))
    .then(console.log(props))
    .then(navigate('/'));
    
    return(
        <div id="sign-up-form-body" >
            <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            

                <div id='name-wrapper'>
              
                <div className='input-wrapper'>
                    
                <label htmlFor='first-name'>First Name 
                <span style={{ verticalAlign: 'super' }}>&lowast;</span>
                {errors.first_name?.type === 'pattern' && <span className='danger' style={{ marginLeft: '1rem' }}>  Letters only</span>}
                </label>
                
       
                
                <input {...register("first_name" ,
                 {  required: true,
                    pattern: /^[A-Za-z]+$/i } )} id='first-name' type="text"/>
                </div>
                
                <div className='input-wrapper'>
                <span className='label-wrapper'>
                <label htmlFor='last-name'>Last Name 
                <span style={{ verticalAlign: 'super' }}>&lowast;</span>
                {errors.last_name?.type === 'pattern' && <span className='danger' style={{ marginLeft: '1rem' }}>Letters only</span>}
                </label>
                
                </span>
                <input {...register("last_name" , 
                { pattern: /^[A-Za-z]+$/i ,
                  required:true
                } )} id='last-name' type="text"/>
                </div>
             
                </div>

            
                <div className='input-wrapper'>
                <label htmlFor="email">Email <span style={{ verticalAlign: 'super' }}>&lowast;</span></label> {errors.email?.type === 'required' && <p className='danger'>an email is required</p>}
                <input {...register("email",{ required: true})} id='email' type="email"/>
                </div>

               

                <div className='input-wrapper'>
                <label htmlFor="password">Password <span style={{ verticalAlign: 'super' }}>&lowast;</span></label> 
                <p className={errors.password?.type === 'required' || errors.password?.type === 'minLength' ? 'danger' : 'default'}>Must be at least 4 characters</p>

                <input {...register("password",{required: true, minLength: 4})} id='password' type="text"/>
                </div>

                <div id='sign-up-button-wrapper'>
                <button className='sign-up-in-button'>Create Account</button>
                </div>
            </form>
            
        </div>

    )
}