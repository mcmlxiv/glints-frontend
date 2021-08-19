import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Account from "./pages/Account";
import { isLoggedIn } from "./api/auth";
import { loadAllUsers } from "./api/requests";
import PersonPage from "./pages/PersonPage";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  //Saving and Render from db
  useEffect(() => {
    (async () => {
      const allUsersQuery = await loadAllUsers();
      setAllUsers(allUsersQuery);
    })();
  });
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const [userID, setUserId] = useState("");
  const handleUserId = (enteredId) => {
    setUserId(enteredId);
  };
  //Check for user credentials in LS
  useEffect(() => {
    const userId = localStorage.getItem("user");
    //there is set again or use userID from state when user logins or signups else null
    localStorage.setItem("user", userId || userID || "");
  });

  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <div>
      <BrowserRouter>
        <>
          <Route path="/" exact>
            {loggedIn ? (
              <Redirect to="/account" />
            ) : (
              <Home handleLogin={handleLogin} handleUser={handleUserId} />
            )}
          </Route>
          <Route path="/account" exact>
            {loggedIn ? (
              <Account handleLogout={handleLogout} />
            ) : (
              <Redirect to="/account" />
            )}
          </Route>
          {allUsers.map((user, index) => {
            return (
              <Route key={index} path={`/person/${user.id}`} exact>
                <PersonPage userId={user.id} />
              </Route>
            );
          })}
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
