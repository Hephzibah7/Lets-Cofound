// // import React, { useState } from 'react';

// // const AccountSettings = ({ handleChangePassword, handleChangeEmail, handleChangeUsername }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [username, setUsername] = useState('');

// //   return (
// //     <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
// //       <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
// //       <div className="space-y-4">

// //         {/* Update Email */}
// //         <div className="flex flex-col space-y-2">
// //           <span className="text-lg">Update Email</span>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="p-2 rounded border"
// //             placeholder="New Email"
// //           />
// //           <button onClick={handleChangeEmail} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
// //             Update
// //           </button>
// //         </div>

// //         {/* Change Password */}
// //         <div className="flex flex-col space-y-2">
// //           <span className="text-lg">Change Password</span>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="p-2 rounded border"
// //             placeholder="New Password"
// //           />
// //           <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
// //             Change
// //           </button>
// //         </div>

// //         {/* Change Username */}
// //         <div className="flex flex-col space-y-2">
// //           <span className="text-lg">Change Username</span>
// //           <input
// //             type="text"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             className="p-2 rounded border"
// //             placeholder="New Username"
// //           />
// //           <button onClick={handleChangeUsername} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
// //             Change
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AccountSettings;

// import React, { useState } from "react";

// const AccountSettings = ({
//   handleChangeEmail,
//   handleChangePassword,
//   handleChangeUsername,
//   message,
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   const handleEmailChange = () => handleChangeEmail(email);
//   const handlePasswordChange = () => handleChangePassword(password);
//   const handleUsernameChange = () => handleChangeUsername(username);

//   return (
//     <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
//       <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
//       <div className="space-y-4">
//         {/* Update Email */}
//         <div className="flex flex-col space-y-2">
//           <span className="text-lg">Update Email</span>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 rounded border"
//             placeholder="New Email"
//           />
//           <button
//             onClick={handleEmailChange}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
//           >
//             Update
//           </button>
//         </div>

//         {/* Change Password */}
//         <div className="flex flex-col space-y-2">
//           <span className="text-lg">Change Password</span>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-2 rounded border"
//             placeholder="New Password"
//           />
//           <button
//             onClick={handlePasswordChange}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
//           >
//             Change
//           </button>
//         </div>

//         {/* Change Username */}
//         <div className="flex flex-col space-y-2">
//           <span className="text-lg">Change Username</span>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="p-2 rounded border"
//             placeholder="New Username"
//           />
//           <button
//             onClick={handleUsernameChange}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
//           >
//             Change
//           </button>
//         </div>
//       </div>
//       {message && (
//         <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountSettings;

import React, { useState } from "react";

const AccountSettings = ({
  handleChangeEmail,
  handleChangePassword,
  handleChangeUsername,
  message,
}) => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = () => handleChangeEmail(email);
  const handlePasswordChange = () => handleChangePassword(oldPassword, newPassword);
  const handleUsernameChange = () => handleChangeUsername(username);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <div className="space-y-4">
        {/* Update Email */}
        <div className="flex flex-col space-y-2">
          <span className="text-lg">Update Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border"
            placeholder="New Email"
          />
          <button
            onClick={handleEmailChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Update
          </button>
        </div>

        {/* Change Password */}
        <div className="flex flex-col space-y-2">
          <span className="text-lg">Change Password</span>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 rounded border"
            placeholder="Old Password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 rounded border"
            placeholder="New Password"
          />
          <button
            onClick={handlePasswordChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Change
          </button>
        </div>

        {/* Change Username */}
        <div className="flex flex-col space-y-2">
          <span className="text-lg">Change Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded border"
            placeholder="New Username"
          />
          <button
            onClick={handleUsernameChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Change
          </button>
        </div>
      </div>
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default AccountSettings;

