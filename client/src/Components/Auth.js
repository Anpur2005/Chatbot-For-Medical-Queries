import React, { useState } from 'react';
import './styles.css';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import axios from "../Services/axiosInterceptor";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
      });
    
    const [input0, setInput0] = useState({
        email: "",
        password: "",
      });
     
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    
    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        // Make a POST request to the login endpoint
        const response = await axios.post("http://127.0.0.1:5000/userlogin", input0);

        // If the login is successful, store user data in local storage and navigate to home
        if (response.status === 200) {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            navigate("/");
        }
        } catch (error) {
            console.error("login failed:", error.response.data.message);
            // Update your UI to show the error message
            alert(error.response.data.message);
        }
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
    
       
        try {
          const response = await axios.post(`http://127.0.0.1:5000/userregister`, {
            user : input,
          });
          setRegistrationSuccess(true);
          setIsActive(false);
          // If registration is successful, navigate to the login page
          if (response.status === 201) {
            setTimeout(() => {
              setRegistrationSuccess(false);
              
            }, 3000);
          }
        } catch (error) {
          console.error("Registration failed:", error.response.data.message);
          // Update your UI to show the error message
          alert(error.response.data.message);
        }
      };

    return (
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleRegister}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><FaGooglePlusG /></a>
                        <a href="#" className="icon"><FaFacebookF /></a>
                        <a href="#" className="icon"><FaGithub /></a>
                        <a href="#" className="icon"><FaLinkedinIn /></a>
                    </div>

                    <span>or use your email for registration</span>
                    {/* <input type="text" placeholder="Name" /> */}
                    
                    <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="form-control form-control-lg"
                    name="name"
                    value={input.name}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />
                    {/* <input type="email" placeholder="Email" /> */}
                    <input
                    type="email"
                    placeholder="Enter Valid Email Address"
                    className="form-control form-control-lg"
                    name="email"
                    value={input.email}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />
                    {/* <input type="password" placeholder="Password" /> */}
                    <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control form-control-lg"
                    name="password"
                    value={input.password}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><FaGooglePlusG /></a>
                        <a href="#" className="icon"><FaFacebookF /></a>
                        <a href="#" className="icon"><FaGithub /></a>
                        <a href="#" className="icon"><FaLinkedinIn /></a>
                    </div>
                    <span>or use your email account</span>
                    {/* <input type="email" placeholder="Email" /> */}
                    <input
                    type="email"
                    id="form3Example3"
                    placeholder="Enter Email"
                    className="form-control form-control-lg"
                    name="email"
                    value={input0.email}
                    onChange={(e) =>
                      setInput0({
                        ...input0,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />
                    {/* <input type="password" placeholder="Password" /> */}
                    <input
                    type="password"
                    id="form3Example4"
                    placeholder="Enter Password"
                    className="form-control form-control-lg"
                    name="password"
                    value={input0.password}
                    onChange={(e) =>
                      setInput0({
                        ...input0,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />
                    <a href="#">Forgot Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                        <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
