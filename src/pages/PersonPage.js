import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { isLoggedIn } from "../api/auth";
import { loadAllUsers } from "../api/requests";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const PersonPage = ({ userId }) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userJobTitle, setUserJobTitle] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = React.useState(18);
  const [showEmailInfo, setShowEmailInfo] = useState(true);
  const [showFirstNameInfo, setShowFirstNameInfo] = useState(true);
  const [showLastNameInfo, setShowLastNameInfo] = useState(true);
  const [showLocationInfo, setShowLocationInfo] = useState(true);
  const [showJobTitleInfo, setShowJobTitleInfo] = useState(true);
  const [showAgeInfo, setShowAgeInfo] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const matches = useMediaQuery("(min-width:1024px)");
  let history = useHistory();

  useEffect(() => {
    //Clean up for Loading current User Name on UI
    //useEffect Clean Up
    let mounted = true;
    (async () => {
      if (mounted) {
        const allUsersQuery = await loadAllUsers();
        setAllUsers(allUsersQuery);
        const usersQuery = allUsers.find(
          //find and store all jobs in obj
          (element) => element.id === userId
        );
        //Set userName to current user's userName
        if (usersQuery) {
          setUserFirstName(usersQuery.firstName);
          setUserLastName(usersQuery.lastName);
          setUserLocation(usersQuery.location);
          setUserJobTitle(usersQuery.jobTitle);
          setUserEmail(usersQuery.email);
          setUserAge(usersQuery.age);
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
  });
  console.log(
    "user",
    userAge,
    userFirstName,
    userLastName,
    userJobTitle,
    userEmail,
    userAge,
    userLocation,
    showEmailInfo,
    showFirstNameInfo,
    showLastNameInfo,
    showLocationInfo,
    showJobTitleInfo,
    showAgeInfo
  );

  return (
    <div className="min-h-screen bg-white flex justify-center items-center h-screen  w-screen lg:p-20 ">
      <div className="shadow-inner absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block animate-pulse " />
      <div className="shadow-inner  shadow-xl w-20 h-40 absolute bg-purple-300 rounded-full -top-10  transform -rotate-12 hidden md:block animate-pulse " />
      <div className="shadow-inner absolute w-48 h-48 rounded-xl bg-purple-300  right-12 transform rotate-12 hidden md:block  animate-pulse" />
      <div className="bg-white lg:p-20 flex justify-center items-center flex-col w-3/4 h-full space-y-8">
        <h1 className="text-base lg:text-5xl text-black flex flex-1  sm:justify-center md:flex-row mt-4">
          This is {userFirstName}'s AllHands <p className="px-2">🙌</p> Profile
        </h1>
        <div
          style={{
            background: "rgba( 255, 255, 255, 0.20 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 0.0px )",
            borderRadius: "10px",
            border: " 1px solid rgba( 255, 255, 255, 0.18 )",
          }}
          className={
            "h-full py-12 lg:w-full w-96 flex flex-col justify-center items-center lg:space-x-20 "
          }
        >
          <div className={"flex justify-center items-center space-x-24"}>
            <div className=" rounded-full lg:h-48 lg:w-48 h-24 w-24 bg-gray-400 flex items-center justify-center p-12 text-white">
              <AccountCircleIcon
                style={{ fontSize: `${matches ? 210 : 100}` }}
              />
            </div>
            <div
              className={"flex flex-col  justify-center items-start space-y-4"}
            >
              {showEmailInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-4 "}>
                  Email:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userEmail}
                  </div>
                </h1>
              )}
              {showFirstNameInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-2 "}>
                  First Name:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userFirstName}
                  </div>
                </h1>
              )}
              {showLastNameInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-2 "}>
                  Last Name:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userLastName}
                  </div>
                </h1>
              )}
              {showLocationInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-2 "}>
                  Location:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userLocation}
                  </div>
                </h1>
              )}
              {showJobTitleInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-2 "}>
                  Job Title:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userJobTitle}
                  </div>
                </h1>
              )}
              {showAgeInfo && (
                <h1 className={"text-gray-400 flex items-center space-x-2 "}>
                  Age:
                  <div className={"text-xl font-bold text-black px-2"}>
                    {userAge}
                  </div>
                </h1>
              )}
            </div>
          </div>
          <button
            onClick={() =>
              isLoggedIn() ? history.push(`/account/`) : history.push(`/`)
            }
            className="p-4  bg-green-400 lg:w-52  hover:bg-blue-500 rounded-lg font-bold text-white mt-8 lg:mt-14 shadow-md"
          >
            {isLoggedIn() ? "Back to Account 🚀" : "Home 🚀"}
          </button>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full bottom-10 left-2/3 hidden md:block animate-pulse" />
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block animate-pulse" />
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block animate-pulse" />
    </div>
  );
};

export default PersonPage;
