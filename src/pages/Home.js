import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useUserCrud } from "../Hooks/useUserCrud";

const Home = (props) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { userAddHandler } = useUserCrud();

  return (
    <div
      onClick={() => {
        setShowSignUp(false);
        setShowSignIn(false);
      }}
      className="min-h-screen bg-gray-900 flex justify-center items-center h-screen w-screen p-20 "
    >
      <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block animate-pulse " />
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full top-5  transform -rotate-12 hidden md:block animate-pulse " />
      <div className="absolute w-48 h-48 rounded-xl bg-purple-300  right-12 transform rotate-12 hidden md:block  animate-pulse" />
      <div className="bg-gray-900 p-20 flex justify-center items-center flex-col">
        <LoginForm
          showSignIn={showSignIn}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          onLogin={props.handleLogin.bind(this)}
          onUserLogin={props.handleUser.bind(this)}
          onClose={() => setShowSignIn(false)}
        />
        <SignUpForm
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          setShowSignIn={setShowSignIn}
          onAddUser={userAddHandler}
          onLogin={props.handleLogin.bind(this)}
          onUserLogin={props.handleUser.bind(this)}
          onClose={() => setShowSignUp(false)}
        />
        <h1 className="text-5xl text-white flex flex-1 sm:flex-col sm:justify-center items-center md:flex-row ">
          Welcome to AllHands 👋
        </h1>
        <div className="text-gray-400 mt-5 text-lg">
          A place to create, share and explore work from around the world 🌏. Of
          course we also make friends along the way.
          <br />
          <p className="text-green-400 text-xl my-1">Let's get started!</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={(e) => {
              setShowSignUp(true);
              e.stopPropagation();
            }}
            className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600"
          >
            Sign up 🚀
          </button>
          <button
            onClick={(e) => {
              setShowSignIn(true);
              e.stopPropagation();
            }}
            className="p-4 bg-blue-400 rounded-lg font-bold text-white mt-5 hover:bg-gray-600"
          >
            Sign in 🔑
          </button>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full bottom-10 left-2/3 hidden md:block animate-pulse" />
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block animate-pulse" />
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block animate-pulse" />
    </div>
  );
};

export default Home;
