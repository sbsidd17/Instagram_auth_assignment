import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", username:"", email: "", bio: "" });
  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get(`http://localhost:4049/v1/user/profile`, {
          withCredentials: true,
        });
        setUserInfo({
          name: res.data.data.name,
          username: res.data.data.username,
          email: res.data.data.email,
          bio: res.data.data.bio,
          profile_url: res.data.data.profile_url,
        });
      } catch (error) {
        navigate("/signin");
      }
    };
    user();
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await axios.get(`http://localhost:4049/v1/user/logout`);
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
        <div className="shadow-gray-400 shadow-2xl w-[420px] px-8 gap-5 flex flex-col">
          <div className="flex "><p className="text-xl font-bold mt-2 text-black">
            @{userInfo.username}
          </p></div>
          <div className="flex gap-10">
          <img className="rounded-full w-20 h-20" src={userInfo.profile_url} alt="" />
          <div className="flex flex-col justify-center items-center">
            <p>12</p>
            <p>Posts</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>10k</p>
            <p>Followers</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>17</p>
            <p>Following</p>
          </div>
          </div>
          <p className="text-lg mt-2 text-gray-800">{userInfo.name}</p>
          <p className="mt-2 text-gray-500">
          {userInfo.bio}
          </p>
          <Link to={"/edit-profile"} state={userInfo}><div className="flex align-catch justify-center w-[100%] border bottom-2 cursor-pointer font-semibold mb-10">Edit Profile</div></Link>
        </div>
      </div>
    </>
  );
};

export default Home;
