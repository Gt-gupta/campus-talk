import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./signIn.css"
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


function SignIn({ login }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleButtonClick = async(e) => {
        e.preventDefault();
        try {
            console.log(process.env);
            const response = await axios.post(`http://localhost:5000/auth/login`, formData);
            console.log('Login Successful:', response.data);
            localStorage.setItem('token', response.data.token);
            
            navigate('/');
        } catch (error) {
            console.error('Error during Login:', error.response.data);
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
        <div style={{ display: "flex", height: "100vh" , width:"100%" }}>
            <img src="/campus.jpg" className="image" alt="Campus background" />
            <div className="signIn">
                <p style={{ fontSize: 25, color: "white", textAlign: "center" }}>
                    Sign in to Campus Talks
                </p>
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

                <button onClick={handleButtonClick} className="signInButton">
                    Sign In
                </button>
                <div className="line"></div>
                <div onClick={login} className="google" style={{backgroundColor:"white",color:"black"}}>
                    <img src="/google.png" height={20} width={20} />
                    <p style={{marginLeft:10,fontSize:18}}>Google</p>
                </div>
                <p style={{ color: "white", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <span
                        style={{ color: "#61dafb", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>

            </div>
        </div>
    );
}

export default SignIn;
