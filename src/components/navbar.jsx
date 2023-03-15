import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase";

function Navbar(props) {
  const { value } = useSelector((state) => state);
  const auth = getAuth(app);
  const out = () => signOut(auth);
  
  const isLoggedIn = Object.keys(props.user).length !== 0;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Shopping App
        </a>
        {isLoggedIn &&  <span className="text-light">Hi,{props.user.name}</span>}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {isLoggedIn && <Link className="nav-link" to={"/"}>Home</Link>}
            </li>
            <li className="nav-item">
              {isLoggedIn && <Link className="nav-link" onClick={out} to={"/"}>Logout</Link>}
            </li>
            <li className="nav-item">
              {isLoggedIn && <Link className="nav-link" to={"/admin"}>Admin</Link>}
            </li>
            <li className="nav-item">
              {value && <Link className="nav-link" to={"/shopping"}>Shopping cart({value})</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
