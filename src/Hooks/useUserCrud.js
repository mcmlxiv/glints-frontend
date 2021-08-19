import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  loadAllUsers,
  loadUserJobs,
  updateUser,
} from "../api/requests";
import { v4 as uuidv4 } from "uuid";

//User Crud operations
const useUserCrud = () => {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const getUserToken = () => {
    return localStorage.getItem("user");
  };
  //Saving and Render from db
  useEffect(() => {
    (async () => {
      const allUsersQuery = await loadAllUsers();
      setAllUsers(allUsersQuery);
      const userQuery = await loadUserJobs(getUserToken());
      if (userQuery) {
        setUser(userQuery.jobList || []);
      }
    })();
  });

  ////ADDING User
  const userAddHandler = (email, password, firstName, lastName) => {
    //Create unique user IDs for users
    const id = uuidv4();
    let age;
    let jobTitle = "Title";
    let location = "Location";
    let showEmail = true;
    let showFirstName = true;
    let showLastName = true;
    let showLocation = true;
    let showJobTitle = true;
    let showAge = true;

    //initialize and set state

    setUser((prevUser) => [
      ...(prevUser || []),
      {
        id,
        firstName,
        lastName,
        email,
        password,
        age,
        jobTitle,
        location,
        showEmail,
        showFirstName,
        showLastName,
        showLocation,
        showJobTitle,
        showAge,
      },
    ]);
    //Database operation Create
    createUser({
      id,
      firstName,
      lastName,
      email,
      password,
      age,
      jobTitle,
      location,
      showEmail,
      showFirstName,
      showLastName,
      showLocation,
      showJobTitle,
      showAge,
    }).then(() => console.log("successfully created user"));
  };

  const usersDeleteHandler = (userId, history, handleLogout, logout) => {
    logout();
    handleLogout();
    console.log(history);
    history.push("/");
    deleteUser(String(userId)).then(() => console.log("successfully deleted"));
  };

  // ///UPDATES User
  const userUpdateHandler = (
    id,
    firstName,
    lastName,
    jobTitle,
    location,
    age,
    showEmail,
    showFirstName,
    showLastName,
    showLocation,
    showJobTitle,
    showAge
  ) => {
    const updatedUser = allUsers.find(
      //find and store all jobs in obj
      (element) => element.id === id
    );

    if (!updatedUser) {
      //null checking
      return null;
    } else {
      //checking for undefined values from text,date, title updates if none return
      updatedUser.firstName = firstName ? firstName : updatedUser.firstName;
      updatedUser.lastName = lastName ? lastName : updatedUser.lastName;
      updatedUser.jobTitle = jobTitle ? jobTitle : updatedUser.jobTitle;
      updatedUser.location = location ? location : updatedUser.location;
      updatedUser.age = age ? age : updatedUser.age;
      updatedUser.showEmail = showEmail;
      updatedUser.showFirstName = showFirstName;
      updatedUser.showLastName = showLastName;
      updatedUser.showLocation = showLocation;
      updatedUser.showJobTitle = showJobTitle;
      updatedUser.showAge = showAge;
    }
    setUser((prevUser) => {
      return prevUser.filter((updatedUser) => updatedUser.id !== id);
    });
    setUser((prevUser) => [...prevUser, updatedUser]);
    //Database operation Update
    updateUser(updatedUser)
      .then(() => console.log("successfully updated user"))
      .catch((err) => console.log(err));
  };

  return {
    userAddHandler,
    usersDeleteHandler,
    userUpdateHandler,
    user,
  };
};

export { useUserCrud };
