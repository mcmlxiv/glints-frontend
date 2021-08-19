import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { loadAllUsers } from "../api/requests";
import { getAccessToken, login } from "../api/auth";
import {
  buttonTextSignIn,
  infoActionSignIn,
  infoMsgSignIn,
  messageSignIn,
  titleSignIn,
} from "../text";

export const Cross = (props) => {
  return (
    <div
      onClick={() => {
        props.onClose();
      }}
      className={"self-end  p-3 transform-translate-y-5 cursor-pointer"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        display="block"
        id="Cross"
      >
        <path d="M20 20L4 4m16 0L4 20" />
      </svg>
    </div>
  );
};
const LoginForm = (props) => {
  //refs for text fields
  const email = useRef(null);
  const password = useRef(null);
  //States for triggering error validation from mUI text fields
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailValidate, setErrorEmailValidate] = useState(false);
  let history = useHistory();

  const submitHandler = () => {
    //Set email and pass err to false to reset component states after every error
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorEmailValidate(false);

    //capture values from input boxes
    const enteredEmail = email.current.value;
    const enteredPass = password.current.value;

    //
    (async () => {
      //load all users from the DB
      const usersQuery = await loadAllUsers();
      //Find if user email already exists in the DB
      const userExists = usersQuery.find((user) => user.email === enteredEmail);

      //if userExists trigger UI error Email already exists
      if (!userExists) {
        setErrorEmailValidate(true);
      } else {
        login(enteredEmail, enteredPass).then((response) => {
          if (response.statusText === "OK") {
            //On correct credentials login

            props.onClose();
            props.onUserLogin(userExists.id);
            props.onLogin();
            history.push("/account");
          } else {
            //Access Local storage and find accessToken
            getAccessToken();
            if (getAccessToken() === "case 1") {
              //Email verification through LS
              return setErrorEmail(true);
            } else {
              //Password verification through Local storage
              return setErrorPassword(true);
            }
          }
        });
      }
    })();
  };
  const helperValidation = (errorEmailValidate, errorEmail) => {
    if (errorEmailValidate) {
      return "Email not found, this user doesn't exist.";
    } else if (errorEmail) {
      return "Email already registered. Please use another!";
    } else {
      return "";
    }
  };
  const closeOnEscapeKey = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  });

  if (!props.showSignIn) return null;

  return (
    <>
      <div className={"fixed bg-black opacity-50 h-screen w-screen z-20"} />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed py-8 pb-12 px-12 bg-white rounded-2xl shadow-xl z-20"
      >
        <div className={"flex flex-col justify-center items-center"}>
          <Cross onClose={props.onClose} />
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            {titleSignIn}
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            {messageSignIn}
          </p>
        </div>
        <form className="space-y-4">
          <div className={"flex flex-col"}>
            <input
              type="text"
              placeholder="Email Address"
              className={`${
                errorEmail || errorEmailValidate
                  ? "outline-none ring-red-300  ring-1  border-red-300"
                  : ""
              } block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
              ref={email}
            />
            <p className={"text-sm  text-red-400"}>
              {helperValidation(errorEmailValidate, errorEmail)}
            </p>
          </div>
          <div className={"flex flex-col "}>
            <input
              type="password"
              placeholder="Type password"
              className={`${
                errorPassword
                  ? "outline-none ring-red-300  ring-1 border-red-300"
                  : ""
              }block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
              ref={password}
              autoComplete="new-password"
              required
            />
            <p className={"text-sm  text-red-400"}>
              {errorPassword ? "Incorrect password." : ""}
            </p>
          </div>
        </form>
        <div className="text-center mt-6">
          <button
            onClick={() => {
              submitHandler();
            }}
            className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
          >
            {buttonTextSignIn}
          </button>
          <p className="mt-4 text-sm">
            {infoMsgSignIn}
            <span
              onClick={() => {
                props.setShowSignUp(true);
                props.onClose();
              }}
              className="underline cursor-pointer"
            >
              {infoActionSignIn}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
