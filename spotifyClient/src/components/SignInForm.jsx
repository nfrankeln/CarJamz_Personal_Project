import './SignInForm.css'
export default function SignInForm(){
    return(
        <div id="sign-in-form-container">
            <form id="sign-in-form">
            <div className='input-wrapper'>
                <label htmlFor="email">Email</label>
                <input id='email' type="email"/>
                </div>

                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                <input id='password' type="text"/>
                </div>
                <div id='sign-up-button-wrapper'>
                <button className='sign-up-in-button'>Login</button>
                </div>
            </form>
        </div>
    )
}