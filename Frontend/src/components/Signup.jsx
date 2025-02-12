import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });

        const answer = await response.json();
        if (answer.success) {
            localStorage.setItem('token', answer.authtoken);
            console.log("User created successfully:", answer.success);
            navigate('/'); // Redirect to home or dashboard
        } else {
            console.log("Error creating user:", answer.error); // Log error if signup fails
        }
    };

    return (
        <>
            <form className='container my-3' onSubmit={handlesubmit}>
                <h2>New To ic-notebook !</h2>
                <h3>Create your Account Here</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder='Enter your Name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter your Email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} placeholder='Enter your Password' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='confirmpassword' value={credentials.confirmpassword} placeholder='Enter your Password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}

export default Signup
