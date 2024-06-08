import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login.js';
import StartupOptions from './StartupOptions.js';
import MainSlider from './MainSlider.js';
import withAuth from './withAuth.js';
import Home from './components/Home.js'
import HomePage from './components_lp/HomePage.js'
import ProfileForm from './components_lp/ProfileForm.js';
import Dashboard from './components_lp/ProfileDash/ProfileDash.js'
import { AuthProvider } from './AuthContext'; // Import AuthProvider from your AuthContext.js
import CreatePostForm from './CreatePostForm.js';
import UserProfile from './UserProfile.js';
import ProjectPage from './components_lp/Project_comp/ProjectPage.js'
import ProjectForm from './components_lp/ProjectForm.js';
import Notifications from './components_lp/Notifications.js';
import DetailedProject from './components_lp/Project_comp/DetailedProject.js'
import ChatMessage from './chatmessage.js';
const AuthenticatedStartupOptions = withAuth(StartupOptions);
const AuthenticatedMainSlider = withAuth(MainSlider);
function App() {
  return (
    <div className="App">
      <AuthProvider>
       <Router>
          <Routes>
           
          <Route exact path="/" element={<Home/>} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/StartupOptions" element={<AuthenticatedStartupOptions/>} />
            <Route exact path="/MainSlider" element={<AuthenticatedMainSlider/>} />
            <Route exact path="/landingpage" element={<HomePage/>} />
            <Route exact path="/ProfileForm" element={<ProfileForm/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/CreatePostForm" element={<CreatePostForm/>} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route exact path="/projectform" element={<ProjectForm/>} />
            <Route exact path="/projectpage" element={<ProjectPage/>} />
            <Route exact path="/notifications" element={<Notifications />} /> {/* Added route for notifications */}
            <Route path="/detailedproject/:projectId" element={<DetailedProject/>} />
            <Route path="/chatmessage" element={<ChatMessage/>} />
          </Routes>
        </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
