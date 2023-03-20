import { useState } from "react";
import FoundUsersBox from "../components/foundUsersBox";
import SearchBox from "../components/SearchBox";
import './CollaberatePage.css'
export default function CollaberatePage(){
    const [users,setUsers]=useState(false)
    const [multiStepForm,setMultiStepForm]=useState(1)
    const handleStateChange = (newState) => {
        setMultiStepForm(newState);
      };
    return(
        <div id="collab-container">
            {multiStepForm === 1 && <SearchBox users={users} setUsers={setUsers} handleStateChange={handleStateChange} /> }
            {multiStepForm === 2 && <FoundUsersBox users={users}/>}      
        </div>


    )
}