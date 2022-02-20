import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navigation from "./Navigation";

export const LoginContext = React.createContext("login");

export default function Layout({ children }) {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    axios({
      url: "http://localhost:3031/request/isLogedin",
      method: "POST",
      withCredentials: true,
    }).then(({ data }) => {
      setLogin(data);
    });
  }, []);
  return (
    <LoginContext.Provider value={{ setLogin, login }}>
      <div className="layout">
        <Navigation />
        <>{children}</>
      </div>
    </LoginContext.Provider>
  );
}
