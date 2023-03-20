import { Outlet,Link,redirect, useNavigate } from "react-router-dom";
import './NavBar.css'
import axios from "axios";
import {GiHamburgerMenu} from 'react-icons/gi'
export default function NavBar(props)
{
    const navigate = useNavigate()
    //FUNCTIONS
    function logout(){
        axios.post('api/logout/')
        .then(response =>  navigate(0) )
        .then(()=> navigate(0))
        .catch(error => {console.log(error);});
    }

    return(
        <>
        <div className="navbar">
            <div className="brand-title">CARJAMZ</div>
             
            <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
            <label for="openSidebarMenu" class="sidebarIconToggle">
                <div class="spinner diagonal part-1"></div>
                <div class="spinner horizontal"></div>
                <div class="spinner diagonal part-2"></div>
                </label>

            <div className="navbar-links">
                <ul>
                    <li><Link to="/">Users</Link></li>
                    <li><Link to="/collaberate">FAQ</Link></li>
                    {props.authenticated?<li><Link to="/profile">Account</Link></li>:null}
                    {props.authenticated?<li id='logout'><button onClick={logout}>Logout</button></li>:<li><Link to="/login">Login</Link></li>}
                </ul>
            {/* <div className="hamburger-menu"><GiHamburgerMenu/></div> */}
            </div>
        </div>
            <Outlet/>
        </>
    )
}