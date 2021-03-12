import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './favicon.ico'

// Navbar that sits at the top of the page. It's a list of links that navigate you to different pages in the website
function Navbar(){
    const [click, setClick] = useState(false);

    return(
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* We would use the icon here */}
                    <Link to="/" className="navbar-logo">
                        <img src={Logo}/>
                    </Link>
                    <ul className="nav-menu">
                        <li className="nav-item">
                             {/* Clicking on this object will take you to computing-resources page*/}
                            <Link to="/computing-resources" className="nav-links">
                                Computing Resources
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* Clicking on this object will take you to LOCATION-TWO page*/}
                            <Link to="/LOCATION-TWO" className="nav-links">
                                LOCATION-TWO
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* Clicking on this object will take you to LOCATION-THREE page*/}
                            <Link to="/LOCATION-THREE" className="nav-links">
                                LOCATION-THREE
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;