import LoginForm from "./LoginForm";
import React from "react";
import "../styles/RegistrationANDloginWindow.css"

const LoginWindow=({onClose, onLoginSuccess})=>{
    return (
    <div className="overlay">
      <div className="registration-window">
        <button className="close-button" onClick={onClose}>
         ✖
        </button>
        <LoginForm onLoginSuccess={onLoginSuccess}/>
       

      </div>
    </div>
    );
};
export default LoginWindow;