import { Link } from "react-router-dom";
import "../css/Navigation.css";
import logo from "../images/MBF.png";

export default function Navigation() 
{
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/listings">Listings</Link>
        <Link className="nav-link" to="/agents">Agents</Link>

        <div className="logo">
          <img src={logo} alt="MBF Realty" className="logo-img" />
        </div>

        <Link className="nav-link" to="/about">About Us</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/signin">Sign In</Link>
      </div>
    </nav>
  );
}
