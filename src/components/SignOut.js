import React from "react";
import { logout } from "../api/auth";
import { useHistory } from "react-router-dom";

const SignOut = (props) => {
  //for history pushing to login page
  let history = useHistory();
  const handleLogouts = () => {
    logout();
    props.handleLogout();
    history.push("/");
  };
  return (
    <div>
      <button
        onClick={handleLogouts}
        className="p-2 border border-2 border-blue-400 rounded-xl text-sm md:text-base hover:border-red-400"
      >
        Sign Out 🏃💨
      </button>
    </div>
  );
};

export default SignOut;
