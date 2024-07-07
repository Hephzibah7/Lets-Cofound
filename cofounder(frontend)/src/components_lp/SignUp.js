

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    otp: "",
    showOtpInput: false,
    password: "",
    showPasswordInput: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendOTP = (e) => {
    e.preventDefault();
    const { email } = user;
    if (email) {
      axios
        .post("http://localhost:9002/api/sendOTP", { email })
        .then((res) => {
          alert("OTP sent successfully."); // You can remove this alert in production
          setUser({
            ...user,
            showOtpInput: true,
          });
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          alert("Error sending OTP. Please try again later.");
        });
    } else {
      alert("Please enter your email.");
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const { email, otp } = user;
    if (otp) {
      axios
        .post("http://localhost:9002/api/verifyOTP", { email, otp })
        .then((res) => {
          if (res.data === "OTP verified successfully") {
            alert("OTP verified successfully.");
            setUser({
              ...user,
              showOtpInput: false,
              showPasswordInput: true,
            });
          } else {
            alert("Invalid OTP. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          alert("Error verifying OTP. Please try again later.");
        });
    } else {
      alert("Please enter the OTP.");
    }
  };

  const register = (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      if (email && password) {
        axios
          .post("http://localhost:9002/api/auth/register", user)
          .then((res) => {
            alert(res.data.message);
            setUser({
              email: "",
              otp: "",
              showOtpInput: false,
              password: "",
              showPasswordInput: false,
            });
            navigate("/login"); // Navigate to Login on successful registration
          })
          .catch((error) => {
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again later.");
          });
      } else {
        alert("Invalid details");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again later.");
    }
  };
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    axios
      .post("http://localhost:9002/api/auth/googleLogin", { tokenId })
      .then((res) => {
        localStorage.setItem('userId', res.data.userId);
        console.log(res.data.userId);
      })
      const userId=localStorage.getItem("userId");
      axios
      .post("http://localhost:9002/api/auth/googleverify", {tokenId})
      .then((res) => {
        const {  token } = res.data;
        localStorage.setItem('token', token);
        alert("Login Succesfull");
        navigate("/profileform");
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
        alert("Error logging in with Google. Please try again later.");
      });
  };
  return (
    <div className="bg-black lg:flex lg:min-h-screen p-10">
      <div className="lg:w-full lg:mt-5 lg:ml-[250px] lg:justify-center lg:items-center lg:bg-white-100">
        <div className="lg:mr-10">
          <h1 className="text-4xl lg:text-4xl lg:mb-5 lg:mt-10 font-bold lg:ml-[410px] ml-10 text-white">
            LetsCoFound
          </h1>
        </div>
        <div className="lg:w-2/3 lg:ml-12 lg:pl-12">
          <div className="text-center mb-3 lg:mb-2">
            {/* <h2 className="text-sm mt-3 lg:text-4xl mb-2 font-bold text-white">
              We Connect Entrepreneurs
            </h2> */}
            <p className="mb-5 text-xs lg:text-xl mt-5 text-purple-500">
              Let's Cofound is a platform that connects entrepreneurs and
              startups.
            </p>
          </div>
          <div className="mb-10 text-white grid gap-3 lg:mb-12 lg:pt-5">
          <GoogleLogin
  onSuccess={credentialResponse => {
    handleGoogleLoginSuccess(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>
           
          </div>
          <div className="mb-7 text-center text-gray-500 lg:mb-7 mt-5">
            <hr className="border-gray-300 border-t-2 mx-auto lg:w-full" />
            <span className="text-white absolute bg-black -mt-3 text-sm">
              Or
            </span>
          </div>
          <form>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <input
                className="flex-grow p-1 placeholder-black-500 bg-white-500 text-black mt-5 lg:mt-0 lg:p-3 lg:px-4 lg:py-2 border-white-300 border rounded mb-5 lg:mb-0"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <button
                onClick={sendOTP}
                className="text-sm font-bold rounded text-white bg-purple-500 p-3"
                type="submit"
              >
                Send OTP
              </button>
            </div>
            {user.showOtpInput && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-5">
                <input
                  className="flex-grow text-black p-1 lg:p-3 border-white-300 border rounded mb-5 lg:mb-0"
                  type="text"
                  name="otp"
                  value={user.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  required
                />
                <button
                  className="text-white bg-purple-500 p-3 rounded"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </button>
              </div>
            )}
            {user.showPasswordInput && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-5">
                <input
                  className="flex-grow text-black p-1 lg:p-3 border-white-300 border rounded mb-5 lg:mb-0"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="text-white bg-purple-500 p-3 rounded"
                  onClick={register}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            )}
            <button
              type="submit"
              onClick={register}
              className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-purple-500 text-white rounded hover:bg-purple-800 lg:text-2xl text-bold mt-5 lg:mt-4"
            >
              Continue with email
            </button>
          </form>
          <h4 className="text-xs lg:text-xl font-bold text-white lg:ml-[260px] ml-10 mt-5 lg:mt-0">
            Already have an account?{" "}
            <Link className="text-purple-500" to="/login">
              Sign In
            </Link>
          </h4>
        </div>
        <div className="text-sm mt-2 p-1 text-white lg:w-3/4 lg:pt-5 lg:ml-[300px] ml-9">
          <h3 className="text-white-600">
            By signing up, you agree to our{" "}
            <span className="text-purple-500 font-bold underline">
              Terms of Services
            </span>{" "}
            &{" "}
            <span className="text-black font-bold underline text-purple-500">
              Privacy Policy
            </span>{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
