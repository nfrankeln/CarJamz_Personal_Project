// DEPENDANCY IMPORTS
import axios from "axios";
import {createBrowserRouter,Route, createRoutesFromElements, RouterProvider, useLocation} from "react-router-dom";
import { useState,useEffect,createContext } from "react";
// UTIL IMPORTS
import { getCookie } from "./utils/cookie";

//PAGE COMPONENT IMPORT
import HomePage from "./pages/HomePage";
import FaqPage from "./pages/FaqPage";
import AccountPage from "./pages/AccountPage";
import CollaberatePage from "./pages/CollaberatePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
//CSS IMPORTS
import './index.css'
import PlaylistPage from "./pages/PlaylistPage";
import Protected from "./components/Protected";


export const accountInfoContext = createContext(null);

 


function App() {
  // STATE
  // check user logged in
  const [authenticated, setAuthenticated] = useState(false);
  // check user had authorized spotify
  const [spotifyAuthorized,setSpotifyAuthorized] = useState(false)
  //check if user has added other appusers for playlist generation
  
  //get current users info
  const [accountInfo, setAccountInfo] = useState(null);
   
  //what part of the application flow the user is at
  const [step,setStep] = useState(1)
  //EFFECT

//check if user is logged into app and autherized spotify
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

//grab users account info
useEffect(() => {
  if (authenticated && spotifyAuthorized) {
    axios.get('api/account/information/')
      .then(response => {
        setAccountInfo({...response.data});
      })
      .catch(error => {
        console.error('Error fetching account information:', error);
      });
  }
}, [authenticated, spotifyAuthorized, setAccountInfo]);
// authenticated, spotifyAuthorized, setAccountInfo
const resetState = () => {
  setAuthenticated(false);
  setSpotifyAuthorized(false);
  setStep(1);
  // Reset any other state variables here
};
useEffect(() => {
        if (authenticated && spotifyAuthorized) {
          setStep(3);
        }
        else if (authenticated){
            setStep(2)
        }
      }, [authenticated, spotifyAuthorized]);


  const csrfToken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;



const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<NavBar authenticated={authenticated} resetState={resetState}/>}>
        <Route index element={<HomePage step={step}/>}></Route>
        <Route path="login" element={<LoginPage setAuthenticated={setAuthenticated}/>}></Route>
        
        <Route path="collaberate" >
          <Route index element={<Protected isLoggedIn={authenticated}><CollaberatePage accountInfo={accountInfo}/></Protected>}></Route>
          <Route path="playlist" element={ 
            <Protected isLoggedIn={authenticated}><PlaylistPage/></Protected>}></Route>
        </Route>
       
        
        <Route path="account" element={
          <Protected isLoggedIn={authenticated}>
        <AccountPage/>
        </Protected>
        }></Route>
  
      </Route>
      
      )
)
  return (
    <accountInfoContext.Provider value={accountInfo}>
      <RouterProvider router={router}/>
      </accountInfoContext.Provider>
  )
}

export default App
