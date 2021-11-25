import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {

    let history = useNavigate();
    const [creds, setCreds] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json();
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.name);
            history('/');
            props.showAlert("Logged in successfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h4 className="text-center">Login to continue </h4>
            <div className="container d-flex justify-content-center" >
                <form onSubmit={handleSubmit} className="my-2 border border-primary p-4" style={{ borderRadius: '10px' }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" id="email" value={creds.email} name="email" aria-describedby="emailHelp" onChange={onChange} style={{ borderRadius: '10px' }} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="password" value={creds.password} name="password" onChange={onChange} style={{ borderRadius: '10px' }} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 my-2" style={{ borderRadius: '10px' }}><strong>Login</strong></button>
                    <div className="text-center my-2"><Link to="/signup" style={{textDecoration:'none'}}>New to myNotes.com? Create new account</Link></div>
                </form>
            </div>
        </>
    )
}

export default Login
