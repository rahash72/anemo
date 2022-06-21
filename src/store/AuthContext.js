import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  username: "",
  university: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUsername = localStorage.getItem("username");
  const initialUniversity = localStorage.getItem("university");
  const initialEmail = localStorage.getItem("email");
  const initialId = localStorage.getItem("id");
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);
  const [university, setUniversity] = useState(initialUniversity);
  const [email, setEmail] = useState(initialEmail);
  const [id, setId] = useState(initialId);
  const userIsLoggedIn = token;

  const loginHandler = async (data) => {
    setUsername(data.username);
    setUniversity(data.university);
    setEmail(data.email);
    setId(data.id);
    setToken(data.accessToken);
    localStorage.setItem("username", data.username);
    localStorage.setItem("university", data.university);
    localStorage.setItem("email", data.email);
    localStorage.setItem("id", data.id);
    localStorage.setItem("token", data.accessToken);
  };

  const logoutHandler = async () => {
    setToken(null);
    setUsername(null);
    setUniversity(null);
    setEmail(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("university");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    university: university,
    username: username,
    email: email,
    id: id,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
