import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarWithMegaMenu } from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarWithMegaMenu />
        
      </div>
    </Router>
  );
}

export default App;
