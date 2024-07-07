import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // Import the ThemeProvider

import Navbar from "./components_lp/Navbar";

import Home from "./components/Home";
import HomePage from "./components_lp/HomePage";
import ProfileForm from "./components_lp/ProfileForm";
import SignUp from "./components_lp/SignUp";
import Login from "./components_lp/Login";
import ProfileDashboard from "./components_lp/ProfileDash/ProfileDash";
import CreatePostForm from "./components_lp/CreatePostForm";
import StartupOptions from "./components_lp/StartupOptions";
import MainSlider from "./components_lp/MainSlider";
import UserProfile from "./components_lp/UserProfile";
import ChatMessage from "./components_lp/MessagingComp/ChatMessage";
import OAuth2Callback from "./components_lp/OAuth2Callback";
import ProjectPage from "./components_lp/Project_comp/ProjectPage";
import ProjectForm from "./components_lp/ProjectForm";
import SettingsPage from "./components_lp/SettingsPage/SettingsPage";
import Notifications from "./components_lp/Notifications";
import DetailedProject from "./components_lp/DetailedProject"
import SearchResults from "./components_lp/SearchResult";
import {GoogleOAuthProvider} from '@react-oauth/google';
import Policy from './components_lp/policy'
function App() {
  return (
    <GoogleOAuthProvider clientId="718777143013-6ebfoc39jin37f73gft2krhj5ofhs10s.apps.googleusercontent.com">
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <Router> {/* Wrap the entire app with Router */}
        <div className="w-full min-h-screen">
          {/* <Navbar /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/profileform" element={<ProfileForm />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profiledash" element={<ProfileDashboard />} />
            <Route exact path="/createPostForm" element={<CreatePostForm />} />
            <Route exact path="/chatMessage" element={<ChatMessage />} />
            <Route exact path="/StartupOptions" element={<StartupOptions />} />
            <Route exact path="/MainSlider" element={<MainSlider />} />
            <Route exact path="/projectpage" element={<ProjectPage />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/projectform" element={<ProjectForm />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/detailedproject/:projectId" element={<DetailedProject />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/settings" element={<HomePage />} />
            <Route path="/policy" element={<Policy />} />
            {/* Add more routes for other components */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
