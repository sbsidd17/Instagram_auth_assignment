import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async () => {
    try {
        setLoading(true)
      const response = await axios.post(
        "http://localhost:4049/v1/user/reset", // Replace with your actual API endpoint for forgotPassword
        { email }
      );
        setLoading(false)
      if (response.data.success) {
        setRequestSent(true);
        setRequestError("");
      }
    } catch (error) {
      setRequestError("An error occurred while sending the reset email");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      {loading === true ? <Loading /> : <div className="border-2 rounded p-8 w-96">
        {!requestSent ? (
          <div className="flex flex-col gap-5">
            <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">
              Forgot Password
            </h2>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg"
              onClick={handleForgotPassword}
            >
              Send Reset Email
            </button>
            {requestError && <p>{requestError}</p>}
          </div>
        ) : (
          <div>
            <h2>Email Sent</h2>
            <p>
              A password reset link has been sent to your email. Please check
              your inbox.
            </p>
          </div>
        )}
      </div>}
    </section>
  );
}

export default ForgotPassword;
