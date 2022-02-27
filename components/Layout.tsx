import React, { useState } from "react";
import customAxios from "../lib/customAxios";
import { useEffect } from "react";
import Navigation from "./Navigation";

interface loginInterface {
  setLogin: (value: boolean) => void;
  login: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
}

export const LoginContext = React.createContext<loginInterface>({
  login: false,
  setLogin: () => {},
});

export default function Layout({ children }: LayoutProps) {
  const [login, setLogin] = useState(false);
  const loginContextValue: loginInterface = {
    login,
    setLogin,
  };

  useEffect(() => {
    customAxios.post("/request/isLogedin").then(({ data }) => {
      setLogin(data);
    });
  }, []);
  return (
    <LoginContext.Provider value={loginContextValue}>
      <div className="layout">
        <Navigation />
        <>{children}</>
      </div>
    </LoginContext.Provider>
  );
}
