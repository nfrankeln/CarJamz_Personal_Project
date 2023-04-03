import axios from "axios";
import { useEffect, useState } from "react";
import FoundGenresCard from "../components/FoundGenresCard";
import FoundUsersBox from "../components/foundUsersBox";
import SearchBox from "../components/SearchBox";
import './CollaberatePage.css'
export default function CollaberatePage({addedUsers,setAddedUsers,accountInfo}){
    const [foundUser,setFoundUser]=useState(false)
    const [commonGenres,setCommonGenres]=useState(null)
    console.log("added users",addedUsers)
    console.log("account info",accountInfo)
    useEffect(()=>{
    if (addedUsers.length===0 && accountInfo!== null ){
    setAddedUsers([...addedUsers,accountInfo])
}},[accountInfo])

    useEffect(()=>{
        setCommonGenres(null)
    if (addedUsers.length > 1){
        getCommonInterests(addedUsers)}
    },[addedUsers])

    
    function getCommonInterests(){
     
        const ids = addedUsers.map(user => user['id'])

        axios.get('api/carjamz/users/common-intrests/' , {params:{
          'ids':ids
        }})
        .then((response)=> setCommonGenres(response['data']['topGenres']))
      }
    return(
        <div id="collab-container">
            <SearchBox foundUser={foundUser} setFoundUser={setFoundUser} />
            {foundUser  && <FoundUsersBox addedUsers={addedUsers} setAddedUsers={setAddedUsers} foundUser={foundUser} setFoundUser={setFoundUser}/>}
            <FoundGenresCard addedUsers={addedUsers} setFoundUser={setFoundUser} commonGenres={commonGenres}/>
        </div>


    )
}