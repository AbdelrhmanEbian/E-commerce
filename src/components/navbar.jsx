import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink ,useLocation} from "react-router-dom";
import { app } from "../firebase";

function Navbar(props) {
  const { value } = useSelector((state) => state);
  const auth = getAuth(app);
  const out = () => signOut(auth);
  const [active,setactive]=useState ("")
  useEffect(()=>{
    const newcl=value?"active value":"value"
    setactive(newcl)
  },[value])
  setTimeout(()=> setactive("value"),1500)
  const isLoggedIn = Object.keys(props.user).length !== 0;
  return (
<nav className="navbar navbar-expand-md navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className={"navbar-brand"}  to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   {isLoggedIn &&<div className="text-light mx-md-5">
      Hi,{ props.user.name}
    </div>}
    { isLoggedIn && <div className="collapse justify-content-end navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav  justify-content-end  mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link "  to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login" onClick={out}>Logout</NavLink>
        </li>
        <li className="nav-item">
         {props.user.email === "abdelrhmanebian@gmail.com"&& <NavLink className="nav-link " to="/admin">Admin</NavLink>}
        </li>
        {value ?
          <li className="nav-item">
          <NavLink className="nav-link " to="/shopping">Shopping Cart <span className={active}>{}</span></NavLink>
        </li>
          :null}
      </ul>
      
    </div>}
  </div>
</nav>
)}

export default Navbar;
