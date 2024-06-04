import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import BellIcon from '@mui/icons-material/Notifications';
import HeartIcon from '@mui/icons-material/Favorite';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the user's profile page based on the search query
      navigate(`/user/${searchQuery}`);
    }
  };

  return (
    <div className="flex items-center justify-between bg-black p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative flex items-center w-4/5">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-black border border-transparent focus:border-white rounded-lg py-2 px-3 pl-10 outline-none w-full"
        />
        <button type="submit" className="absolute left-3">
          <SearchIcon className="h-5 w-5 text-black" />
        </button>
      </form>

      {/* Icons */}
      <div className="flex items-center space-x-6 bg-purple-800 p-2 pl-3 pr-3 rounded-lg">
        <div className="cursor-pointer">
          <BellIcon className="text-white hover:text-black hover:transition hover:duration-300" />
        </div>
        <div className="cursor-pointer">
          <HeartIcon className="text-white hover:text-red-600 hover:transition hover:duration-300" />
        </div>
      </div>
    </div>
  );
}
