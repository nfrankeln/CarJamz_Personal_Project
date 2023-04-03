import { Outlet,Link,redirect, useNavigate } from "react-router-dom";
import styles from './NavBar.module.css'
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
        <div className={styles.navbar}>
            <div className={styles.brandTitle}>CARJAMZ</div>
             
            <input type="checkbox" className={styles.openSidebarMenu} id="openSidebarMenu" />
            <label for="openSidebarMenu" className={styles.sidebarIconToggle}>
                <div className={`${styles.spinner} ${styles.diagonal} ${ styles.part1}`}></div>
                <div className= {`${styles.spinner} ${styles.horizontal}`}></div>
                <div className={`${styles.spinner} ${styles.diagonal} ${ styles.part2}`}></div>
                </label>

            <div className={styles.navbarLinks}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/faq">Faq</Link></li>
                    {props.authenticated?<li><Link to="/account">Account</Link></li>:null}
                    {props.authenticated?<li id='logout'><button onClick={logout}>Logout</button></li>:<li><Link to="/login">Login</Link></li>}
                </ul>
            </div>
        </div>
            <Outlet/>
        </>
    )
}