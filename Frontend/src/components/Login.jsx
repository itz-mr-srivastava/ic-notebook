import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" });

    const handlesubmit = async (e) => {
        e.preventDefault(); //if this is not used
        // The form will reload the page immediately upon submission.
        // This means the browser will reload everything before the data can be sent to the server via fetch.
        // As a result, your logic will never complete.
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const answer = await response.json();
        if (answer.success) {
            localStorage.setItem('token', answer.authtoken);
            console.log(answer.authtoken);
            navigate('/');
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <form className='container my-3' onSubmit={handlesubmit}>
                <h1>Welcome Back!</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control text-dark" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter your Email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control text-dark" id="password" name='password' value={credentials.password} placeholder='Enter your Password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}

export default Login
