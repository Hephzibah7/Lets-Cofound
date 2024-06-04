import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js'
const SignUp = () => {
  const { setUserId } = useAuth();
  const Navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    otp: '',
    showOtpInput: false,
    password: '',
    showPasswordInput: false,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value)
    setUser({
      ...user,
      [name]: value

  })
}

  const sendOTP = (e) => {
    e.preventDefault();

    const { email } = user;
    if (email) {
      axios.post('http://localhost:9002/sendOTP', { email })
        .then((res) => {
          alert('OTP sent successfully.'); // You can remove this alert in production
          setUser({
            ...user,
            showOtpInput: true,
          });
        })
        .catch((error) => {
          console.error('Error sending OTP:', error);
          alert('Error sending OTP. Please try again later.');
        });
    } else {
      alert('Please enter your email.');
    }
  };


  const verifyOTP = (e) => {
    e.preventDefault();
    const { email, otp } = user;
    if (otp) {
      axios.post('http://localhost:9002/verifyOTP', { email, otp })
        .then((res) => {
          if (res.data === 'OTP verified successfully') {
            alert('OTP verified successfully.');
            setUser({
              ...user,
              showOtpInput: false,
              showPasswordInput: true,
            });
          } else {
            alert('Invalid OTP. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error verifying OTP:', error);
          alert('Error verifying OTP. Please try again later.');
        });
    } else {
      alert('Please enter the OTP.');
    }
  };


  const register = (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      if (email && password) {
        axios.post("http://localhost:9002/register", user)
          .then(res => {
            alert(res.data.message);
            setUserId(res.data.userId);
            setUser({
              email: '',
              otp: '',
              showOtpInput: false,
              password: '',
              showPasswordInput: false,
            });
            Navigate('/Login'); // Navigate to Login on successful registration
          })
          .catch(error => {
            console.error('Error registering user:', error);
            alert('Error registering user. Please try again later.');
          });
      } else {
        alert("Invalid details");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again later.');
    }
  }


  return (
    <div className="bg-black lg:flex lg:h-screen p-10 ">
      {/* First Half: Image */}
      <div className="hidden lg:w-1/3 lg:h-2/3 lg:ml-20 lg:mt-20 lg:mr-12 lg:bg-cover lg:bg-center  lg:flex lg:items-center lg:justify-center">
        {/* Designer Image */}
        {/* Add alt text for accessibility */}
        <img className="animate-bounce rounded lg:w-full lg:h-full pl-10 ml-20" src="Designer5.png" alt="Designer Image" />
      </div>
      {/* Second Half: Signup Section */}
      <div className="lg:w-1/2 lg:mt-5 lg:pl-12 lg:ml-12 lg:justify-center lg:items-center lg:bg-white-100 ">
        {/* Signup Header */}
        <div className='lg:mr-10'>
          <h1 className="text-4xl lg:text-3xl lg:mb-5 lg:mt-10 font-bold text-center lg:pr-12 lg:mr-12 text-white">LetsCofound</h1>
        </div>
        <div className="lg:w-2/3 lg:ml-12 lg:pl-12">
          {/* Welcome Section */}
          <div className="text-center mb-3 lg:mb-2">
            <h2 className="text-sm mt-3 lg:text-4xl mb-2 font-bold text-white">We Connect Entrepreneurs</h2>
            <p className="mb-5 text-xs lg:text-xl mt-5 text-purple-500">Let's Cofound is a platform that connects entrepreneurs and startups.</p>
          </div>
          {/* Continue with Google and Microsoft Buttons */}
          <div className="mb-10 text-white grid gap-3 lg:mb-12 lg:pt-5">
            <button className="p-1 lg:p-4 flex items-center justify-center lg:w-full border-gray-300 border-2 text-black-500 rounded font-bold">
              <div className='w-8 mr-2'>
                <img className='' src="https://i.pinimg.com/originals/b7/86/79/b786795a5bfba85a9d0422b015d2a460.jpg" alt="Google Icon"></img>
              </div>
              <p className='text-xs lg:text-sm'>Continue with Google</p>
            </button>
            <button className="p-1 lg:p-4 flex items-center justify-center  lg:w-full border border-gray-300 border-2 text-black-500 rounded font-bold">
              <div className='w-8 mr-2'>
                <img className='' src="https://i.pinimg.com/1200x/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.jpg" alt="Google Icon"></img>
              </div>
              Continue with Microsoft
            </button>
          </div>
          {/* Or Section */}
          <div className="mb-7  text-center text-gray-500 lg:mb-7 mt-5">
            <hr className="border-gray-300 border-t-2 mx-auto lg:w-full" />
            <span className="text-white absolute bg-black -mt-3 text-sm">Or</span>
          </div>
          {/* Email and Password Input */}
          <form >
            {/* <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required className="p-1 w-full placeholder-black-500 bg-white-500 text-black mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-white-300 border rounded mb-5" /> */}

            <input
              className="p-1 w-full placeholder-black-500 bg-white-500 text-black mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-white-300 border rounded mb-5"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
           
            <button onClick={sendOTP} className="text-sm font-bold rounded text-white bg-purple-500 p-3 mb-7" type="submit">Send OTP</button>


            {user.showOtpInput && (
              <div>
                <input
                  className='text-white bg-purple-500 mb-5 rounded p-1'
                  type="text"
                  name="otp"
                  value={user.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  required
                />
                {user.passwordError && <p className="text-red-500">{user.passwordError}</p>}

                <button className='text-white bg-purple-500 p-1 rounded ml-3' onClick={verifyOTP}>Verify OTP</button>
              </div>
            )}

            {/* <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required  className="p-1 w-full text-black lg:w-full lg:p-3 border-white-300 border rounded mb-10" /> */}

            {/* Form to set password */}
            {user.showPasswordInput && (
              <div >
                <input
                  className="p-1 w-full text-black lg:w-full lg:p-3 border-white-300 border rounded"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button onClick={register} type="submit">Sign Up</button>
              </div>
            )}



            {/* Submit Button */}
            <button type="submit" onClick={register} className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-purple-500 text-white rounded hover:bg-purple-800 lg:text-2xl text-bold">Continue with email</button>
          </form>
          <h4 className='text-xs lg:text-xl font-bold text-white '>Already have an account? <a className=' text-purple-500' href="/login">Sign In</a></h4>
        </div>
        <div className='text-sm mt-2 p-1 text-white lg:w-3/4  lg:pt-5 lg:ml-12'>
          <h3 className='text-white-600'>By signing up, you agree to our <span className='text-purple-500 font-bold underline '>Terms of Services</span> & <span className='text-black font-bold underline text-purple-500'>Privacy Policy</span> </h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
