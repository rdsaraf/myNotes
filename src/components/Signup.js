import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let history = useNavigate();
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = creds;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.name);
            history('/');
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h4 className="text-center">SignUp to create account </h4>
            <div className="container d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="my-2 border border-primary p-4" style={{ borderRadius: '10px' }} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><strong>Your Name</strong></label>
                        <input type="text" className="form-control" id="name" name="name" value={creds.name} style={{ borderRadius: '10px' }} onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" id="email" name="email" value={creds.email} aria-describedby="emailHelp" style={{ borderRadius: '10px' }} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="password" name="password" value={creds.password} style={{ borderRadius: '10px' }} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label"><strong>Confirm Password</strong></label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" style={{ borderRadius: '10px' }} onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 my-2" style={{ borderRadius: '10px' }}><strong>SignUp</strong></button>
                </form>
            </div>
        </>
    )
}

export default Signup
