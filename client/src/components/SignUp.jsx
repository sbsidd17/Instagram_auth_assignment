import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    image: null
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, image: e.target.files[0] }); // Handle image input separately
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userInfo.name);
      formData.append("username", userInfo.username);
      formData.append("email", userInfo.email);
      formData.append("password", userInfo.password);
      formData.append("bio", userInfo.bio);
      formData.append("image", userInfo.image);
      setLoading(true)
      await axios.post(`http://localhost:4049/v1/user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setLoading(false)
      toast("SignUp Successfully");
      navigate("/signin");
    } catch (error) {
        setLoading(false)
      console.log("Error : ", error);
      setErrorMessage(error.response.data.msg);
    }
  };



  return (
    <section className="w-full h-screen flex justify-center items-center">
      {loading === true ? <Loading /> : <div className=" rounded border-2 m-20 p-8 w-96 h-[500px] overflow-auto">
        <form id="form-data" action="" onSubmit={handleFormSubmit}>
          <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">
            Instagram SignUp
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="font-semibold">
              name
            </label>
            <input
              type="text"
              onChange={handleOnChange}
              value={userInfo.name}
              required
              id="name"
              name="name"
              placeholder="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="username" className="font-semibold">
              username
            </label>
            <input
              type="text"
              onChange={handleOnChange}
              value={userInfo.username}
              required
              id="username"
              name="username"
              placeholder="username"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="font-semibold">
              email
            </label>
            <input
              type="email"
              onChange={handleOnChange}
              value={userInfo.email}
              required
              id="email"
              name="email"
              placeholder="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="font-semibold">
              password
            </label>
            <input
              type="password"
              onChange={handleOnChange}
              value={userInfo.password}
              required
              id="password"
              name="password"
              placeholder="password"
              autoComplete="false"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="bio" className="font-semibold">
              bio
            </label>
            <input
              type="text"
              onChange={handleOnChange}
              value={userInfo.bio}
              required
              id="bio"
              name="bio"
              placeholder="bio"
              autoComplete="false"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="image" className="font-semibold">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleOnChange}
              required
              id="image"
              name="image"
              placeholder="Profile Picture"
              autoComplete="false"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {errorMessage && (
            <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>
          )}
          <div className="flex justify-center">
            {/* <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">SignUp</button> */}
            <button
              type="submit"
              className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="text-gray-500 mt-3 text-center text-sm">
          Forgot Password?{" "}
          <Link to={"/signin"} className="text-blue-600 ml-3">
            Log in
          </Link>
        </p>
      </div>}
    </section>
  );
};

export default SignUp;
