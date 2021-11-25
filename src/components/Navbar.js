import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


export const Navbar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
        props.showAlert('Logged out successfully','success');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><strong>myNotes.com</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-outline-primary mx-3 text-light " to="/login" role="button"><strong>Login</strong></Link>
                            <Link className="btn btn-primary" to="/signup" role="button"><strong>SignUp</strong></Link>
                        </form> :<><p className="text-light text-center my-2 mx-3"><strong>Hello {localStorage.getItem('username')}</strong></p><button onClick={handleLogout} className="btn btn-primary mx-2"><strong>LogOut</strong></button></>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
