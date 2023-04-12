import React, { useState, useEffect } from "react";
import "../Signup/Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Waves from "../Waves/Waves";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    setUser({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };

  if (localStorage.getItem("token")) {
    window.location = "/dashboard";
  }

  useEffect(() => {
    axios
      .post("http://localhost:3001/auth/login", user)
      .then((res) => {
        console.log(res.data);
        if ("token" in res.data) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="box absolute flex flex-col B1">
        <div className="header flex justify-center text-slate-900 rounded-t-lg px-8 py-1 ">
          Hermes
        </div>
        <div className="flex px-8 py-6 text-left rounded-b-lg bg-slate-900  ">
          <form onSubmit={loginUser}>
            <div className="mt-4">
              <div>
                <i className="text-cyan-600 fas fa-user"></i>
                <label className=" text-cyan-500 pl-2" for="Username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username..."
                  name="username"
                  className="w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900"
                  autoComplete="off"
                />
              </div>
              <div className="mt-4">
                <i className="text-cyan-600 fa-solid fa-key hover"></i>
                <label className=" text-cyan-500 pl-2">Password</label>
                <input
                  type={passwordType}
                  placeholder="Enter your password..."
                  name="password"
                  className="w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900"
                  autoComplete="off"
                />
                {passwordType === "password" ? (
                  <i
                    className="fas fa-eye-slash text-cyan-600 absolute right-10 mt-4 cursor-pointer"
                    onClick={togglePassword}
                  ></i>
                ) : (
                  <i
                    className="fas fa-eye text-cyan-600 absolute right-10 mt-4 cursor-pointer"
                    onClick={togglePassword}
                  ></i>
                )}
              </div>
              <div className="flex">
                {/* <Link to="/dashboard"> */}
                  <button onClick={()=>{
                    loginUser()
                  }} className="btn w-full px-6 py-2 mt-4 text-gray-300 font-semibold text-md rounded-lg">
                    Login
                  </button>
                {/* </Link> */}
              </div>
              <div className="mt-6 text-gray-300">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-cyan-500 hover:underline pl-2"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <Waves />
      </footer>
    </div>
  );
};

export default Login;
