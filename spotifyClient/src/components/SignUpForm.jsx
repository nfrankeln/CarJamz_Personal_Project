import './SignUpForm.css'
export default function SignUpForm(){
    return(
        <div id="sign-up-form-container" >
            <form id="sign-up-form">
                <div id='name-wrapper'>
                <div className='input-wrapper'>
                <label htmlFor='first-name'>First Name</label>
                <input id='first-name' type="text"/>
                </div>

                <div className='input-wrapper'>
                <label htmlFor='last-name'>Last Name</label>
                <input id='last-name' type="text"/>
                </div>
                </div>
                <div className='input-wrapper'>
                <label htmlFor="email">Email</label>
                <input id='email' type="email"/>
                </div>

                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                <input id='password' type="text"/>
                </div>
                <div id='sign-up-button-wrapper'>
                <button id='sign-up-button'>Lets GO!</button>
                </div>
            </form>
        </div>

    )
}