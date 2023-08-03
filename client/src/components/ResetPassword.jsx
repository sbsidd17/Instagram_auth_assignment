import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function ResetPassword() {
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Extract the reset token from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setResetToken(token);
    }
  }, []);

  const handlePasswordReset = async () => {
    try {
      if (password !== confirmationPassword) {
        setResetError("Passwords do not match");
        return;
      }
      setLoading(true)
      const response = await axios.post(
        `http://localhost:4049/v1/user/reset/${resetToken}`, // Replace with your actual API endpoint for resetPassword
        { password }
      );
        setLoading(false)
      if (response.data.success) {
        setResetSuccess(true);
        setResetError("");
      }
    } catch (error) {
      setResetError("An error occurred while resetting the password");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      {loading === true ? <Loading /> :  <div className="border-2 rounded p-8 w-96">
        {!resetSuccess ? (
          <div className="flex flex-col gap-5">
            <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">
              Reset Password
            </h2>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="password"
              placeholder="Confirm Password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
            <button
              className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg"
              onClick={handlePasswordReset}
            >
              Submit
            </button>
            {resetError && <p>{resetError}</p>}
          </div>
        ) : (
          <div>
            <h2>Password Reset Successful</h2>
            <p>Your password has been reset successfully.</p>
            <Link to={"/signin"} className="text-blue-600 ml-3">
              Login Now
            </Link>
          </div>
        )}
      </div>}
    </section>
  );
}

export default ResetPassword;
