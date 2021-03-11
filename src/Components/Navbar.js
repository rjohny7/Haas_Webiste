import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './favicon.ico'

function Navbar(){
    // This fills 1 hook requirement, need one more (same way as video source from Part 3 reference material)
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
                            {/* change / to route location */}
                            <Link to="/computing-resources" className="nav-links">
                                Computing Resources
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* change / to route location */}
                            <Link to="/LOCATION-TWO" className="nav-links">
                                LOCATION-TWO
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* change / to route location */}
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