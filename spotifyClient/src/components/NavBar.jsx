import { useState,useEffect } from "react";
import { Outlet,Link,redirect, useNavigate } from "react-router-dom";
import './NavBar.css'
import axios from "axios";
export default function NavBar()
{
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('api/is_authenticated/')
            .then(response => {
                setAuthenticated(response.data.authenticated);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    function logout(){
        axios.post('api/logout/')
        .then(response =>  navigate("/login") )
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <div id="app-container">
        <div id="navbar">
            <div id="navbar-child-logo"><Link>Carjamz</Link></div>
            <div id="navbar-child-links" >
                <ul id="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link>Users</Link></li>
                    <li><Link>Profile</Link></li>
                    {authenticated?<li><button onClick={logout}>Logout</button></li>:<li><Link to="/login">Login</Link></li>}
                </ul>
            </div>
        </div>
            <Outlet/>
        </div>
    )
}