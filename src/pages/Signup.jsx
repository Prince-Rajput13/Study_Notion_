import React from 'react'
import Template from "../components/core/Auth/Template";
import signinImg from "../assets/Images/signup.webp";

function SignUp() {
  return (
    <Template 
      heading="Join the millions learning to code with StudyNotion for free"
      des1="Build skills for today, tomorrow, and beyond."
      des2="Education to future-proof your career."
      image={signinImg}
      formType="signin"
    />
  )
}

export default SignUp