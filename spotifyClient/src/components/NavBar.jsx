import { Outlet,Link,redirect, useNavigate } from "react-router-dom";
import './NavBar.css'
import axios from "axios";
export default function NavBar(props)
{
    const navigate = useNavigate()
   
    //FUNCTIONS
    function logout(){
        axios.post('api/logout/')
        .then(response =>  navigate("/login") )
        .then(()=> navigate(0))
        .catch(error => {console.log(error);});
    }

    return(
        <div id="app-container">
        <div id="navbar">
            <div id="navbar-child-logo"><Link>Carjamz</Link></div>
            <div id="navbar-child-links" >
                <ul id="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link>Users</Link></li>
                    {props.authenticated?<li><Link to="/profile">Profile</Link></li>:null}
                    {props.authenticated?<li><button onClick={logout}>Logout</button></li>:<li><Link to="/login">Login</Link></li>}
                </ul>
            </div>
        </div>
            <Outlet/>
        </div>
    )
}