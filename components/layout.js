import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navigation from "./navigation";

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
        <Navigation login={login} />
        <>{children}</>
        <style jsx global>
          {`
            .layout {
              display: flex;
            }
            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td,
            article,
            aside,
            canvas,
            details,
            embed,
            figure,
            figcaption,
            footer,
            header,
            hgroup,
            menu,
            nav,
            output,
            ruby,
            section,
            summary,
            time,
            mark,
            audio,
            video {
              margin: 0;
              padding: 0;
              border: 0;
              font-size: 100%;
              font: inherit;
              vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            menu,
            nav,
            section {
              display: block;
            }
            body {
              line-height: 1;
            }
            ol,
            ul {
              list-style: none;
            }
            blockquote,
            q {
              quotes: none;
            }
            blockquote:before,
            blockquote:after,
            q:before,
            q:after {
              content: "";
              content: none;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
            }
            input:focus {
              outline: none;
            }
            a {
              color: inherit;
              text-decoration: none;
            }
            li {
              text-decoration: none;
            }
          `}
        </style>
      </div>
    </LoginContext.Provider>
  );
}
