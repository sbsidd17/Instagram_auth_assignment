import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", bio: "" });
  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}v1/user/profile`, {
          withCredentials: true,
        });
        setUserInfo({
          username: res.data.data.username,
          email: res.data.data.email,
          bio: res.data.data.bio,
        });
      } catch (error) {
        navigate("/signin");
      }
    };
    user();
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}v1/user/logout`);
      toast("Logout Successfully")
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogOut}
        className="fixed top-10 right-10 bg-[#4CB5F9] hover:bg-[#319ae0] active:bg-[#4CB5F9] text-white h-10 w-28 font-semibold rounded-lg"
      >
        Logout
      </button>
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-gray-400 shadow-2xl w-[420px] px-8 py-5 flex flex-col justify-center items-center">
          <img className="rounded-full w-52 h-52" src="https://graph.org/file/b66211e60ca697e22b76e.jpg" alt="" />
          <p className="text-2xl font-bold mt-2 text-black">
            @{userInfo.username}
          </p>
          <p className="text-lg text-center mt-2 text-gray-800">
            {userInfo.bio}
          </p>
          <p className="text-xl text-center mt-2 text-gray-500">
            {userInfo.email}
          </p>
          <p className="text-lg text-center mt-2 text-gray-500">
            Followers: 1000
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
