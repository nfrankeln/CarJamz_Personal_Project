import {createBrowserRouter,Route, createRoutesFromElements, RouterProvider, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import './index.css'
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import { useState,useEffect } from "react";
import CollaberatePage from "./pages/CollaberatePage";
import { getCookie } from "./utils/cookie";
 


function App() {
  // STATE
  // check user logged in
  const [authenticated, setAuthenticated] = useState(false);
  // check user had authorized spotify
  const [spotifyAuthorized,setSpotifyAuthorized] = useState(false)
  //check if user has added other appusers for playlist generation
  const [addedUsers,setAddedUsers]=useState([])
  
  //EFFECT
  useEffect(() => {
    axios.get('api/is_authenticated/')
        .then(response => {
            setAuthenticated(response.data.is_authenticated);
            setSpotifyAuthorized(response.data.permission)
        })
        .catch(error => {
            console.log(error);
        })
}, []);

 
  const csrfToken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
  
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar authenticated={authenticated}/>}>
        <Route path="" element={<HomePage addedUsers={addedUsers} setAddedUsers={setAddedUsers} authenticated={authenticated} spotifyAuthorized={spotifyAuthorized}/>}></Route>
        <Route path="login" element={<LoginPage setAuthenticated={setAuthenticated}/>}></Route>
        <Route path="collaberate"element={<CollaberatePage addedUsers={addedUsers} setAddedUsers={setAddedUsers}/>}></Route>
        <Route path="profile" element={<ProfilePage spotifyAuthorized={spotifyAuthorized}/>}></Route>
      </Route>
      )
)
  return (
      <RouterProvider router={router}/>
  )
}

export default App
