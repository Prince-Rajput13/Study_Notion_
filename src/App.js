import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
function App() {
  const [Loggedin,setLoggedin] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<OpenRoute>
            <Login/>
          </OpenRoute>
        }/>
        <Route path="/signin" element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }/>
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>
        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/>
        <Route path="/about" element={
          <OpenRoute>
            <AboutUs/>
          </OpenRoute>
        }/>
        <Route path="/contact" element={
          <OpenRoute>
            <ContactUs/>
          </OpenRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
