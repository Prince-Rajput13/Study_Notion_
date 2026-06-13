import loginImg from "../assets/Images/login.webp";
import React from 'react'
import Template from "../components/core/Auth/Template";

function Login() {
  return (
    <Template
        heading="Welcome Back"
        dec1="Build skills for today, tomorrow, and beyond."
        dec2="Education to future-proof your career."
        image= {loginImg}
        formType="login"
    />
  )
}

export default Login