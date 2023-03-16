import { useState } from "react";
import FoundUsersBox from "../components/foundUsersBox";
import SearchBox from "../components/SearchBox";
import './CollaberatePage.css'
export default function CollaberatePage(){
    const [users,setUsers]=useState(false)
    return(
        <div id="collab-container">
        <SearchBox users={users} setUsers={setUsers}/>
        {users?<FoundUsersBox users={users}/>:null}
        </div>


    )
}