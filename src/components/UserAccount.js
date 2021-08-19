import React, { useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import SimpleSelect from "./AgePicker";
import { useUserCrud } from "../Hooks/useUserCrud";
import { loadUserJobs } from "../api/requests";
import { logout } from "../api/auth";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const UserAccount = (props) => {
  const firstNameInputRef = useRef("");
  const lastNameInputRef = useRef("");
  const jobInputRef = useRef("");
  const locationInputRef = useRef("");
  const [age, setAge] = React.useState(18);
  const { userUpdateHandler, usersDeleteHandler } = useUserCrud();
  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userJobTitle, setUserJobTitle] = useState("");
  const [userLocation, setUserLocation] = useState("");
  //toggle Vanity URL info
  const [showEmailInfo, setShowEmailInfo] = useState(true);
  const [showFirstNameInfo, setShowFirstNameInfo] = useState(true);
  const [showLastNameInfo, setShowLastNameInfo] = useState(true);
  const [showLocationInfo, setShowLocationInfo] = useState(true);
  const [showJobTitleInfo, setShowJobTitleInfo] = useState(true);
  const [showAgeInfo, setShowAgeInfo] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipBoard = async (e, copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  const matches = useMediaQuery("(min-width:1024px)");
  const handleEmailChange = () => {
    setShowEmailInfo(!showEmailInfo);
  };
  const handleFirstNameChange = () => {
    setShowFirstNameInfo(!showFirstNameInfo);
  };
  const handleLastNameChange = () => {
    setShowLastNameInfo(!showLastNameInfo);
  };
  const handleLocationChange = () => {
    setShowLocationInfo(!showLocationInfo);
  };
  const handleJobTitleChange = () => {
    setShowJobTitleInfo(!showJobTitleInfo);
  };
  const handleShowAgeChange = () => {
    setShowAgeInfo(!showAgeInfo);
  };
  let history = useHistory();
  const handleLogouts = () => {
    logout();
    props.handleLogout();
    history.push("/");
  };
  useEffect(() => {
    //Clean up for Loading current User Name on UI
    //useEffect Clean Up
    let mounted = true;
    (async () => {
      if (mounted) {
        const getUserToken = () => {
          return localStorage.getItem("user");
        };
        const usersQuery = await loadUserJobs(getUserToken());

        //Set userName to current user's userName
        if (usersQuery) {
          setUserFirstName(usersQuery.firstName);
          setUserLastName(usersQuery.lastName);
          setUserLocation(usersQuery.location);
          setUserJobTitle(usersQuery.jobTitle);
          setUserId(usersQuery.id);
          setAge(usersQuery.age);
          setShowEmailInfo(usersQuery.showEmail);
          setShowAgeInfo(usersQuery.showAge);
          setShowFirstNameInfo(usersQuery.showFirstName);
          setShowLastNameInfo(usersQuery.showLastName);
          setShowLocationInfo(usersQuery.showLocation);
          setShowJobTitleInfo(usersQuery.showJobTitle);
        }
      }
    })();
    //useEffect Clean Up
    return () => {
      mounted = false;
    };
  }, [userLastName, userFirstName]);
  const userProfileHandler = (e) => {
    e.preventDefault();
    userUpdateHandler(
      userId,
      firstNameInputRef.current.value,
      lastNameInputRef.current.value,
      jobInputRef.current.value,
      locationInputRef.current.value,
      age,
      showEmailInfo,
      showFirstNameInfo,
      showLastNameInfo,
      showLocationInfo,
      showJobTitleInfo,
      showAgeInfo
    );
  };
  return (
    <form className="mx-auto  ">
      <div>
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-20">
          <div className={"flex flex-col items-center space-y-2"}>
            <div className={"flex "}>
              <div className=" rounded-full lg:h-48 lg:w-48 h-24 w-24 bg-gray-400 flex items-center justify-center p-10 text-white">
                <AccountCircleIcon
                  style={{ fontSize: `${matches ? 210 : 100}` }}
                />
              </div>
            </div>
            <div className={"flex flex-col space-x-3"}>
              <div className={"flex items-center justify-center space-x-3"}>
                <button
                  onClick={userProfileHandler}
                  className="lg:w-52 w-28 h-20 lg:h-16  outline-none p-4 bg-blue-400 hover:bg-green-500 rounded-lg font-bold text-white lg:mt-14 mt-8 shadow-md"
                >
                  Save Info 💾
                </button>
                <button
                  onClick={usersDeleteHandler.bind(
                    null,
                    userId,
                    history,
                    handleLogouts,
                    logout
                  )}
                  className="lg:w-52 w-28 h-20 lg:h-16 p-4 bg-red-500 hover:bg-black rounded-lg font-bold text-sm text-white lg:mt-14 mt-8 shadow-md"
                >
                  Delete User ☠️
                </button>
              </div>
              <div className={"w-80 lg:w-64 pt-2"}>
                <p className={"italic  break-words self-center"}>
                  Tip: After editing your profile always{" "}
                  <span className={"font-bold"}>Save</span> and be careful any
                  deleted data is gone forever!!!
                </p>
              </div>
            </div>
          </div>

          <div className={"py-2 lg:py-0 w-full "}>
            <div className="flex flex-col items-center lg:items-start justify-center space-y-4">
              <div>
                <p className={"text-lg font-bold "}>
                  Hey Stranger! 🙋‍♂️ What's your Story? 📖
                </p>
              </div>
              <div
                className={"flex lg:flex-row flex-col items-center space-x-2"}
              >
                <TextField
                  label={"First Name:  " + userFirstName}
                  id={"First Name"}
                  defaultValue={userFirstName}
                  inputRef={firstNameInputRef}
                />
                <TextField
                  label={"Last Name:  " + userLastName}
                  id={"Last Name"}
                  defaultValue={userLastName}
                  inputRef={lastNameInputRef}
                />
              </div>
              <div className={"flex items-center"}>
                <SimpleSelect setAge={setAge} age={age} />
              </div>
              <div className={"flex items-center"}>
                <TextField
                  label={"Job Title:  " + userJobTitle}
                  id={"Title"}
                  defaultValue={userJobTitle}
                  inputRef={jobInputRef}
                />
              </div>
              <div className={"flex items-center"}>
                <TextField
                  label={"location:  " + userLocation}
                  id={"location"}
                  inputRef={locationInputRef}
                  defaultValue={userLocation}
                />
              </div>
              <div className={"flex items-center space-x-4  "}>
                <a
                  href={`person/${userId}`}
                  className="  flex justify-center  items-center  p-4 bg-green-400 lg:w-52 w-28 h-16  hover:bg-blue-500 rounded-lg font-bold text-white shadow-md"
                >
                  Show Profile 🚀
                </a>
                <button
                  onClick={() => copyToClipBoard("some text to copy")}
                  className=" lg:w-52 w-28 h-16  flex justify-center  items-center  p-4 bg-indigo-400   hover:bg-yellow-500 rounded-lg font-bold text-white  shadow-md"
                >
                  {copySuccess ? "Copied! 👍" : "Copy URL 📋"}
                </button>
              </div>
              <div className={"flex flex-col space-y-4"}>
                <div>
                  <p className={"italic break-words lg:w-full w-52"}>
                    Select the items
                    <span className={"font-bold mx-1"}>you</span>
                    want others to see and smash that{" "}
                    <span className={"font-bold"}>save</span> button!
                  </p>
                </div>
                <div
                  className={
                    "flex  items-center lg:justify-center justify-between lg:space-x-4"
                  }
                >
                  <div
                    className={
                      "flex  flex-col lg:flex-row items-start space-y-2  lg:space-y-0  lg:space-x-4"
                    }
                  >
                    <div className={"flex items-center"}>
                      <input
                        onChange={handleEmailChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        id={"email "}
                        checked={showEmailInfo}
                      />
                      <label htmlFor={"email "} className="ml-2 text-gray-700">
                        Email
                      </label>
                    </div>
                    <div className={"flex items-center"}>
                      <input
                        onChange={handleFirstNameChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        checked={showFirstNameInfo}
                        id={"firstName"}
                      />
                      <label
                        htmlFor={"firstName"}
                        className="ml-2 text-gray-700"
                      >
                        First Name
                      </label>
                    </div>
                    <div className={"flex items-center"}>
                      <input
                        onChange={handleLastNameChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        checked={showLastNameInfo}
                        id={"lastName"}
                      />
                      <label
                        htmlFor={"lastName"}
                        className="ml-2 text-gray-700"
                      >
                        Last Name
                      </label>
                    </div>
                  </div>
                  <div
                    className={
                      "flex  flex-col lg:flex-row items-start space-y-2 lg:space-y-0 lg:space-x-4"
                    }
                  >
                    <div className={"flex items-center"}>
                      <input
                        onChange={handleLocationChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        checked={showLocationInfo}
                        id={"showLocation"}
                      />
                      <label
                        htmlFor={"showLocation"}
                        className="ml-2 text-gray-700"
                      >
                        Location
                      </label>
                    </div>

                    <div className={"flex items-center"}>
                      <input
                        onChange={handleJobTitleChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        checked={showJobTitleInfo}
                        id={"jobTitle"}
                      />
                      <label
                        htmlFor={"jobTitle"}
                        className="ml-2 text-gray-700"
                      >
                        Job Title
                      </label>
                    </div>
                    <div className={"flex items-center"}>
                      <input
                        onChange={handleShowAgeChange}
                        type="checkbox"
                        className={
                          "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        }
                        checked={showAgeInfo}
                        id={"showAge"}
                      />
                      <label htmlFor={"showAge"} className="ml-2 text-gray-700">
                        Age
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserAccount;
