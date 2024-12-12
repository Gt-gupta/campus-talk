import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure Axios is installed and imported
import './signUp.css';


const API_URL = process.env.REACT_APP_API_URL;

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Validate form data
        if (!formData.email || !formData.password || !formData.username) {
            alert("Please fill all the fields.");
            return;
        }
    
        try {
            console.log(formData);
            const response = await axios.post(`http://localhost:5000/auth/signUp`, formData);
            console.log('Signup successful:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/signIn');
        } catch (error) {
            console.error('Error during Signup:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            
        }
    }
    

    function Input(props) {
        return (
            <input
                className="input"
                placeholder={props.text}
                spellCheck="false"
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        );
    }

    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            <img src="/campus.jpg" className="image" alt="Campus background" />
            <div className="signUp">
                <p style={{ fontSize: 25, color: "white", textAlign: "center" }}>
                    Sign up for Campus Talks
                </p>
                <Input
                    text="Name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button onClick={handleSignUp} className="signUpButton">
                    Sign Up
                </button>
                <div className="line"></div>
                <p style={{ color: "white", textAlign: "center" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#61dafb", cursor: "pointer" }}
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
