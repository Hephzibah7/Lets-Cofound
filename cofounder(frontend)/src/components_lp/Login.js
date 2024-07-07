// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const Navigate= useNavigate();

//   const [user,setUser]=useState({
//     email:"",
//     password:"",

// })

// const [errorMessage, setErrorMessage] = useState('');

// const handleChange = e =>{
//   const{name, value}=e.target;
//   console.log(name,value)
//   setUser({
//       ...user,
//       [name]:value
//   })
// }

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const { email, password } = user;
//     const response = await axios.post('http://localhost:9002/api/auth/login', user);
//     const { userId, token } = response.data; // Assuming your API response includes userId and token
//     console.log(userId);
//     localStorage.setItem('token', token); // Store the token in localStorage
//     alert('Login successful!');
//     console.log(userId);
//     // Check if the userId exists in the profile table
//     const profileResponse = await axios.get(`http://localhost:9002/api/profiles/checkProfile/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(profileResponse.data);

//     if (profileResponse.data.exists) {
//       Navigate("/home");
//     } else {
//       Navigate("/profileform");
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       alert('Invalid credentials.'); // Display alert for wrong password
//     } else {
//       alert('Error logging in. Please try again later.'); // Display alert for other errors
//     }
//   }
// };
  
//   return (
//     <div className="bg-black lg:flex lg:h-screen p-10 ">
      
//       {/* Second Half: Signup Section */}
//       <div className="lg:w-1/2 lg:mt-5 lg:pl-12 lg:ml-12 lg:justify-center lg:items-center lg:bg-white-100 ">
//         {/* Signup Header */}
//         <div className='lg:mr-10'>
//           <h1 className="text-5xl  mt-10 pt-10 lg:text-5xl  lg:mt-10 font-bold text-center lg:pr-12 lg:mr-12 text-white">LetsCofound</h1>
//           <p className='text-white mb-5 mr-12 pr-12 mt-2'>Explore Connect Collaborate</p>
//         </div>
//         <div className="lg:w-2/3 lg:ml-12 lg:pl-12">
         
//           {/* Continue with Google and Microsoft Buttons */}
//           <div className=" pt-10 mb-10 text-white grid gap-3 lg:mb-12 lg:pt-5">
//             <button className="p-2 lg:p-4 flex items-center justify-center lg:w-full border-gray-300 border-2 text-black-500 rounded font-bold" onClick={googleAuth}>
//               <div className='w-8 mr-2'>
//                 <img className='' src="https://i.pinimg.com/originals/b7/86/79/b786795a5bfba85a9d0422b015d2a460.jpg" alt="Google Icon"></img>
//               </div>
//               Continue with Google
//             </button>
//             <button className="p-2 lg:p-4 flex items-center justify-center lg:w-full border-gray-300 border-2 text-black-500 rounded font-bold">
//               <div className='w-8 mr-2'>
//                 <img className='' src="https://i.pinimg.com/1200x/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.jpg" alt="Google Icon"></img>
//               </div>
//               Continue with Microsoft
//             </button>
//           </div>
//           {/* Or Section */}
//           <div className="mb-7  text-center text-gray-500 lg:mb-7 mt-5">
//             <hr className="border-gray-300 border-t-2 mx-auto lg:w-full" />
//             <span className="text-white absolute bg-black -mt-3 text-sm">Or</span>
//           </div>
//           {/* Email and Password Input */}
//           <form >
//             <input type="email" placeholder="Email" name="email" onChange={handleChange} value={user.name} required className="p-1 w-full placeholder-black-500 bg-white-500 text-black mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-white-300 border rounded mb-5" />
//             <input type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password} required className="p-1 w-full text-black lg:w-full lg:p-3 border-white-300 border rounded mb-10" />
//             {/* Submit Button */}
//             <button type="submit" className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-purple-500 text-white rounded hover:bg-purple-800 lg:text-2xl text-bold" onClick={handleLogin}>Continue with email</button>
//           </form>
//           <h4 className='text-1xl font-bold text-white '>Don't have an account? <a className=' text-purple-500' href="#">Sign Up</a></h4>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      const response = await axios.post('http://localhost:9002/api/auth/login', user);
      const { userId, token } = response.data; // Assuming your API response includes userId and token
      console.log(userId);
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('userId', userId); // Store the token in localStorage
      alert('Login successful!');
      console.log(userId);
      // Check if the userId exists in the profile table
      const profileResponse = await axios.get(`http://localhost:9002/api/profiles/checkProfile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(profileResponse.data);

      if (profileResponse.data.exists) {
        navigate("/home");
      } else {
        navigate("/profileform");
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
    <div className="bg-black lg:flex lg:h-screen p-10">
      <div className="lg:w-full lg:mt-5 lg:ml-[200px] lg:justify-center lg:items-center lg:bg-white-100">
        <div className="lg:mr-10 lg:ml-[-65px] text-center lg:text-left">
          <h1 className="text-5xl mt-10 pt-10 lg:text-5xl lg:mt-10 font-bold text-center lg:pr-12 lg:mr-12 text-white">
            LetsCoFound
          </h1>
          <p className="text-white mb-5 lg:mr-12 lg:pr-12 mt-2 lg:mt-4 text-center lg:text-center">
            Explore Connect Collaborate
          </p>
        </div>
        <div className="lg:w-2/3 lg:ml-[120px]">
          <div className="pt-10 mb-10 text-white grid gap-3 lg:mb-12 lg:pt-5">
            
          </div>
          
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={user.email}
              required
              className="p-1 w-full placeholder-black-500 bg-white-500 text-black mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-white-300 border rounded mb-5"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={user.password}
              required
              className="p-1 w-full text-black lg:w-full lg:p-3 border-white-300 border rounded mb-10"
            />
            <button
              type="submit"
              className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-purple-500 text-white rounded hover:bg-purple-800 lg:text-2xl text-bold"
              onClick={handleLogin}
            >
              Continue with email
            </button>
          </form>
          <h4 className="text-1xl font-bold text-white text-center lg:text-left">
            Don't have an account?{" "}
            <a className="text-purple-500" href="/signup">
              Sign Up
            </a>
          </h4>
        </div>
        <div className="text-sm mt-2 p-1 text-white lg:w-3/4 lg:pt-5 lg:ml-[300px] ml-9 text-center lg:text-left">
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

export default Login;

