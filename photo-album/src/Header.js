import React from 'react';
function Header() {
    return (
    < nav className = "header navbar" >
        <h1 > Your albums </h1>
            <ul className = "nav justify-content-end" >
            <li className = "nav-item" ><a className = "nav-link" href = "#"> Home </a> </li> 
            <li className = "nav-item" ><a className = "nav-link" href = "#"> All albums </a> </li>
            <li className = "nav-item" ><a className = "nav-link" href = "#"> Add album </a> </li> 
            <li className = "nav-item" ><a className = "nav-link" href = "#"> About </a> </li> 
        </ul>
        
    </nav>
    )
}
export default Header