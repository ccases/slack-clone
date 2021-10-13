import React from 'react'
import "./Logout.css"
import {MdOutlineLogout} from "react-icons/md"

function Logout() {

const clearLocalStorage = () => {
    localStorage.clear();
    window.location = "/";
}


    return (
        <div className="logout">
            <MdOutlineLogout size={"25"} onClick={clearLocalStorage}/>
        </div>
    )
}

export default Logout
