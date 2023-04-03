import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistGenerator from "../components/PlaylistGenerator";
import SearchResults from "../components/SearchResults";
import SearchBox from "../components/SearchBox";
import './CollaberatePage.css'
export default function CollaberatePage({addedUsers,setAddedUsers,accountInfo}){
    const [foundUser,setFoundUser]=useState(false)
    const [commonGenres,setCommonGenres]=useState(null)
// load logged in users account info into group since account info is null by default 
// need to prevent adding null value into array 
    useEffect(()=>{
    if (addedUsers.length===0 && accountInfo!== null ){
    setAddedUsers([...addedUsers,accountInfo])
}},[accountInfo])
// if added users change clear out genre list, only fetch data when there are at least 2 users
    useEffect(()=>{
        setCommonGenres(null)
    if (addedUsers.length > 1){
        getCommonInterests(addedUsers)}
    },[addedUsers])

    
    function getCommonInterests(addedUsers){
        const ids = addedUsers.map(user => user['id'])
        axios.get('api/carjamz/users/common-intrests/' , {params:{'ids':ids}})
        .then((response)=> setCommonGenres(response['data']['topGenres']))
      }
      
    return(
        <div id="collab-container">
            <SearchBox foundUser={foundUser} setFoundUser={setFoundUser} />
            {foundUser  && <SearchResults addedUsers={addedUsers} setAddedUsers={setAddedUsers} foundUser={foundUser} setFoundUser={setFoundUser}/>}
            <PlaylistGenerator addedUsers={addedUsers} setFoundUser={setFoundUser} commonGenres={commonGenres}/>
        </div>


    )
}