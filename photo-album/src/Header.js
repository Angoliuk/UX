import React from 'react';
function Header() {
    return (
    < nav className = "header navbar" >
        <h1 > Your albums </h1>
            <ul className = "nav justify-content-end" >
            <li className = "nav-item"><a className = "nav-link" href = "/home"> Home </a> </li> 
            <li className = "nav-item"><a className = "nav-link" href = "https://www.google.com"> All albums </a> </li>
            <li className = "nav-item"><a className = "nav-link" href = "https://www.google.com"> Add album </a> </li> 
            <li className = "nav-item"><a className = "nav-link" href = "https://www.google.com"> About </a> </li> 
        </ul>
        
    </nav>
    )
}
export default Header