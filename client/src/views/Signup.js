import React from "react";
import "./Signup.css";

function Signup(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">
        {/* {props.isRegistered ? "Login" : "Registere"} */}
        Register
      </button>
    </form>
  );
}

export default Signup;