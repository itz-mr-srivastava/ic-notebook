

import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">

            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ic-notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname == "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname == "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token') ? <div>
                    <Link class="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                    <Link class="btn btn-outline-primary mx-1" to="/signup" role="button">Sign up</Link>
                </div> : <button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
            </div>
            {/* <div>
                    <Link class="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                    <Link class="btn btn-outline-primary mx-1" to="/signup" role="button">Sign up</Link>
                </div> */}
        </nav >

    )
}



