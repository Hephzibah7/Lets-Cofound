import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const Navigate= useNavigate();
  

  const [user,setUser]=useState({
    email:"",
    password:"",

})

const [errorMessage, setErrorMessage] = useState('');

const handleChange = e =>{
  const{name, value}=e.target;
  console.log(name,value)
  setUser({
      ...user,
      [name]:value
  })
}

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { email, password } = user;
    const response = await axios.post('http://localhost:9002/login', user);
    const { userId, token } = response.data; // Assuming your API response includes userId and token
    localStorage.setItem('token', token); // Store the token in localStorage
    alert('Login successful!');

    // Check if the userId exists in the profile table
    const profileResponse = await axios.get(`http://localhost:9002/checkProfile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (profileResponse.data.exists) {
      Navigate("/landingpage");
    } else {
      Navigate("/ProfileForm");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Invalid credentials.'); // Display alert for wrong password
    } else {
      alert('Error logging in. Please try again later.'); // Display alert for other errors
    }
  }
};
  
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
          <h1 className="text-5xl  mt-10 pt-10 lg:text-5xl  lg:mt-10 font-bold text-center lg:pr-12 lg:mr-12 text-white">LetsCofound</h1>
          <p className='text-white mb-5 mr-12 pr-12 mt-2'>Explore Connect Collaborate</p>
        </div>
        <div className="lg:w-2/3 lg:ml-12 lg:pl-12">
         
          {/* Continue with Google and Microsoft Buttons */}
          <div className=" pt-10 mb-10 text-white grid gap-3 lg:mb-12 lg:pt-5">
            <button className="p-2 lg:p-4 flex items-center justify-center lg:w-full border-gray-300 border-2 text-black-500 rounded font-bold">
              <div className='w-8 mr-2'>
                <img className='' src="https://i.pinimg.com/originals/b7/86/79/b786795a5bfba85a9d0422b015d2a460.jpg" alt="Google Icon"></img>
              </div>
              Continue with Google
            </button>
            <button className="p-2 lg:p-4 flex items-center justify-center  lg:w-full border border-gray-300 border-2 text-black-500 rounded font-bold">
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
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={user.name} required className="p-1 w-full placeholder-black-500 bg-white-500 text-black mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-white-300 border rounded mb-5" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password} required className="p-1 w-full text-black lg:w-full lg:p-3 border-white-300 border rounded mb-10" />
            {/* Submit Button */}
            <button type="submit" className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-purple-500 text-white rounded hover:bg-purple-800 lg:text-2xl text-bold" onClick={handleLogin}>Continue with email</button>
          </form>
          <h4 className='text-1xl font-bold text-white '>Don't have an account? <a className=' text-purple-500' href="#">Sign Up</a></h4>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
