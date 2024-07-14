import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../Services/axiosInterceptor";

const ResetPassword = () => {
  // Extracting id and token from the URL parameters
  const { id, token } = useParams();
  const navigate = useNavigate();

  // State to manage input fields for new password and confirm password
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to change the password using the provided id, token, and input data
      const res = await axios.post(`http://127.0.0.1:5000/resetPassword/${id}/${token}`, input);

      // If the password is changed successfully, show an alert and navigate to the login page
      if (res.status === 200) {
        alert("Password Changed Successfully");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      // Update UI to show the error message
    }
  };

  // JSX structure for the ChangePassword component
  return (
          <div className="container active" id="container">
            
              <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Reset Password?</h1>
                    

                   
                    {/* <input type="email" placeholder="Email" /> */}
                    <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control form-control-lg"
                    name="newpassword"
                    value={input.newPassword}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />

                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg"
                    name="confirmpassword"
                    value={input.confirmPassword}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    />

                    
                    <button type="submit">Reset password</button>
                </form>
            </div>
            
            <div className="toggle-container">
                <div className="toggle">
                  
                    <div className="toggle-panel toggle-left">
                        <h1>Type your new password here</h1>
                        
                        <button className="hidden" id="login" >Go to Login page</button>
                    </div>
                  
            </div>
        </div>
        </div>
    );
}
export default ResetPassword;
