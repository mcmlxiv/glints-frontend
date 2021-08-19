import axios from "axios";

const accessTokenKey = "accessToken";
const userKey = "user";

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
};
export const getUserToken = () => {
  return localStorage.getItem("user");
};

export const login = async (email, password) => {
  return await axios({
    method: "post",
    url: process.env.REACT_APP_LOGIN_IN,
    headers: { "content-type": "application/json" },
    data: { email, password },
  })
    .then(async (response) => {
      if (response.statusText === "OK") {
        const token = await response.data.token;
        const userId = await response.data.user.id;

        localStorage.setItem(userKey, userId);
        localStorage.setItem(accessTokenKey, token);
      }
      return response;
    })
    .catch((errors) => {
      if (errors.response.status === 401) {
        //Storing case status in LS
        localStorage.setItem(accessTokenKey, errors.response.data);
      }

      return errors;
    });
};

export const signUp = async (email, password) => {
  return await axios({
    method: "post",
    url: process.env.REACT_APP_SIGN_UP,
    headers: { "content-type": "application/json" },
    data: { email, password },
  }).then(async (response) => {
    if (response.statusText === "OK") {
      const token = await response.data.token;
      const userId = await response.data.user.id;
      localStorage.setItem(userKey, userId);
      localStorage.setItem(accessTokenKey, token);
    }
    return response;
  });
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(accessTokenKey);
};

export const logout = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(userKey);
  localStorage.removeItem("jobs");
};
