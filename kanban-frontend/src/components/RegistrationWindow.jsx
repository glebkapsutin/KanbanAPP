import RegisterForm from "./RegisterForm";
import React from "react";
import "../styles/RegistrationANDloginWindow.css"

const RegistrationWindow=({onClose})=>{
    return (
    <div className="overlay">
      <div className="registration-window">
        <button className="close-button" onClick={onClose}>
         ✖
        </button>
        <RegisterForm />
       

      </div>
    </div>
    );
};
export default RegistrationWindow;