import React, { useState } from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi"
import SideBar from "./sidebar";
import "./navbar.css";

const Navbar =({activeMenu}) => {
    return (
        <div className="navbar">
            <button
               className="menu-toggle"
               onClick={() => {
                setOpenSideBar(!openSideBar);
               }}
               >
                {openSideBar ? (
                    <HiOutlineX className="icon" />
                ) : (
                    <HiOutlineMenuAlt3 className="icon" />
                )}    
               </button>

               <h2 className="navbar-title">Tracker</h2>

               {openSideBar && (
                <div className="sidebar-container">
                    <SideBar activeMenu={activeMenu} />
                    </div>
               )}
               </div>
    );
}; 

export default Navbar