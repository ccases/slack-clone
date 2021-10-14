import React from 'react'
import "./Logout.css"
import {MdOutlineLogout} from "react-icons/md"
import AuthAPI from "../../Services/AuthAPI"

function Logout() {

// const clearLocalStorage = () => {
//     localStorage.clear();
//     window.location = "/";
// }

const logout = () => {
    AuthAPI.logout();
    window.location ="/";
}


    return (
        <div className="logout">
    
            <MdOutlineLogout size={"25"} onClick={logout}/>
        </div>
    )
}

export default Logout
