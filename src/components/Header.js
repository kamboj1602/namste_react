import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Namste React logo" />
      </div>

      <nav className="nav-items">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
        <span className="cart-pill">Cart</span>
      </nav>

      <button
        className="login-btn"
        onClick={() =>
          setBtnName((prev) => (prev === "Login" ? "Logout" : "Login"))
        }
      >
        {btnName}
      </button>
    </header>
  );
};

export default Header;
