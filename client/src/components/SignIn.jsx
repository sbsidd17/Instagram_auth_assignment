import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}v1/user/login`,
        { ...userInfo },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast("Login Successfully")
      navigate("/");
    } catch (error) {
      console.log("error : ", error);
      setErrorMessage(error.response.data.msg);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="border-2 rounded p-8 w-96">
        <form action="" onSubmit={handleFormSubmit}>
          <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">
            Instagram Login
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              onChange={handleOnChange}
              value={userInfo.email}
              placeholder="Your Username"
              autoComplete="false"
              id="username"
              name="username"
              className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="username" className="font-semibold">
              password
            </label>
            <input
              type="password"
              onChange={handleOnChange}
              value={userInfo.password}
              placeholder="password"
              autoComplete="false"
              id="password"
              name="password"
              className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {errorMessage && (
            <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <button className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg">
              Log in
            </button>
          </div>
          <p className="text-gray-500 mt-3 text-center text-sm">
            Forgot Password?{" "}
            <Link to={"/signup"} className="text-blue-600 ml-3">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
