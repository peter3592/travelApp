import React from "react";
import { useState } from "react";
import fetchAPI from "../utils/fetchAPI";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (
    // email,
    username,
    password,
    passwordConfirm,
    userPhoto
  ) => {
    const { ok, data, message } = await fetchAPI(
      "api/v1/users/signup",
      "POST",
      {
        // email,
        username,
        password,
        passwordConfirm,
        photo: userPhoto,
      }
    );

    return { ok, data, message };
  };

  const login = async (username, password) => {
    const { ok, data } = await fetchAPI("api/v1/users/login", "POST", {
      username,
      password,
    });

    if (ok) setCurrentUser(data.user);

    return ok;
  };

  const logout = async () => {
    const { ok } = await fetchAPI("api/v1/users/logout");

    if (ok) setCurrentUser(null);

    return ok;
  };

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
