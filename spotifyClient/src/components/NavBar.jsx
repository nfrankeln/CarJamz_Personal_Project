import { Outlet,Link } from "react-router-dom";
import './NavBar.css'
export default function NavBar()
{
    return(
        <div id="app-container">
        <div id="navbar">
            <div id="navbar-child-logo"><Link>Carjamz</Link></div>
            <div id="navbar-child-links" >
                <ul id="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link>Users</Link></li>
                    <li><Link>Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
            <Outlet/>
        </div>
    )
}