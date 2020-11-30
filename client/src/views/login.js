import React from "react";

function Login(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {/* <input type="password" placeholder="Confirm Password" /> */}
      <button type="submit">
        {/* {props.isRegistered ? "Login" : "Registered"} */}
        Login
      </button>
    </form>
  );
}

export default Login;




