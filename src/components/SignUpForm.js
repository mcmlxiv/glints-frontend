import React, { useEffect, useRef, useState } from "react";
import {
  buttonTextSignUp,
  infoActionSignUp,
  infoMsgSignUp,
  messageSignUp,
  titleSignUp,
} from "../text";
import { Cross } from "./LoginForm";
import { useHistory } from "react-router-dom";
import { loadAllUsers } from "../api/requests";
import { signUp } from "../api/auth";

const SignUpForm = (props) => {
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
  const email = useRef(null);
  const password = useRef(null);
  const reEnterPassword = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailValidate, setErrorEmailValidate] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  let history = useHistory();
  const submitHandler = () => {
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorEmailValidate(false);

    //Using Regex to check user Email pattern example@example.com
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    //Validating email
    const validEmail = validateEmail(email.current.value);
    const enteredEmail = validEmail ? email.current.value : false;
    const reEnteredPassword = reEnterPassword.current.value;

    //capture other inputs
    const enteredPassword = password.current.value;
    const enteredFirstName = firstName.current.value;
    const enteredLastName = lastName.current.value;

    //If enteredEmail is string therefore valid trigger Api request
    if (typeof enteredEmail === "string") {
      (async () => {
        //load all users from the DB
        const usersQuery = await loadAllUsers();
        //Find if user email already exists in the DB
        const userExists = usersQuery.find(
          (user) => user.email === enteredEmail
        );
        const samePass = reEnteredPassword === enteredPassword;

        //if userExists trigger UI error Email already exists
        if (userExists) {
          setErrorEmail(true);
        } else if (!samePass) {
          setErrorPassword(true);
        } else {
          //else create user with captured Inputs
          props.onAddUser(
            enteredEmail,
            enteredPassword,
            enteredFirstName,
            enteredLastName
          );
          //upon Sign up success redirect to app page and login
          signUp(enteredEmail, enteredPassword).then((response) => {
            if (response.statusText === "OK") {
              //On correct credentials login
              props.onClose();
              props.onLogin();
              history.push("/account");
            }
          });
        }
      })();
    } else {
      return setErrorEmailValidate(true);
    }

    firstName.current.value = "";
    lastName.current.value = "";
  };
  //Email Validation on display on GUI for email Helper Text
  const helperValidation = (errorEmailValidate, errorEmail) => {
    if (errorEmailValidate) {
      return "Invalid Email, email should be like example@example.com";
    } else if (errorEmail) {
      return "Email already registered. Please use another!";
    } else {
      return "";
    }
  };

  if (!props.showSignUp) return null;

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
            {titleSignUp}
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            {messageSignUp}
          </p>
        </div>
        <form className="space-y-4">
          <div className={"flex space-x-4"}>
            <input
              type="text"
              placeholder="First Name"
              className="block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              autoComplete="username"
              ref={firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              ref={lastName}
              autoComplete="lastname"
            />
          </div>
          <div className={"flex flex-col"}>
            <input
              type="text"
              placeholder="Email Address"
              autoComplete="Email Address"
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
          <input
            type="password"
            placeholder="Password"
            className={`${
              errorPassword
                ? "outline-none ring-red-300 ring-1 border-red-300"
                : ""
            }block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
            ref={password}
            autoComplete="new-password"
            required
          />
          <div className={"flex flex-col "}>
            <input
              type="password"
              placeholder="Re-type password"
              className={`${
                errorPassword
                  ? "outline-none ring-red-300  ring-1 border-red-300"
                  : ""
              }block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
              ref={reEnterPassword}
              autoComplete="new-password"
              required
            />
            <p className={"text-sm  text-red-400"}>
              {errorPassword ? "Passwords aren't the same." : ""}
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
            {buttonTextSignUp}
          </button>
          <p className="mt-4 text-sm">
            {infoMsgSignUp}
            <span
              onClick={() => {
                props.setShowSignIn(true);
                props.onClose();
              }}
              className="underline cursor-pointer"
            >
              {infoActionSignUp}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
