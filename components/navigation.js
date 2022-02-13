import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navigation = ({ isSignin, setIsSignin }) => {
  const navigate = useRouter();
  const [shopHeight, setShopHeight] = useState("0");
  const [shopOpacity, setShopOpacity] = useState("0");
  const [shopEvent, setShopEvent] = useState("none");
  const [shopSubStyle, setShopSubStyle] = useState({
    height: `${shopHeight}`,
    opacity: `${shopOpacity}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justidyContent: "space - evenly",
  });
  const onShopClick = () => {
    if (shopHeight === "150px") {
      setShopHeight("0");
      setShopOpacity("0");
      setShopEvent("none");
    } else {
      setShopHeight("150px");
      setShopOpacity("1");
      setShopEvent("unset");
    }
    setShopSubStyle({
      height: `${shopHeight}`,
      opacity: `${shopOpacity}`,
      pointerEvents: `${shopEvent}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
    });
  };

  const onSignout = () => {
    axios({
      url: "http://localhost:3031/request/signout",
      method: "POST",
      withCredentials: true,
    }).then(({ data }) => {
      setIsSignin(data);
      navigate("/");
      navigate.push("/");
    });
  };

  return (
    <nav className="nav">
      <span className="logo">
        <Link href="/">
          <a>CODE</a>
        </Link>
      </span>
      <ul className="nav-items">
        <li className="nav-item">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li onClick={onShopClick} className="shop nav-item">
          Shop
        </li>
        <ul className="shop-sub sub" style={shopSubStyle}>
          <Link href="/shop/all">
            <a>all</a>
          </Link>
          <Link href="/shop/outer">
            <a>outer</a>
          </Link>
          <Link href="/shop/top">
            <a>top</a>
          </Link>
          <Link href="/shop/pants">
            <a>pants</a>
          </Link>
          <Link href="/shop/accessory">
            <a>asccessory</a>
          </Link>
          <Link href="/shop/shoes">
            <a>shoes</a>
          </Link>
        </ul>
        <li className="nav-item">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link href="/qna">Q&A</Link>
        </li>
      </ul>
      {isSignin ? (
        <div className="my">
          <span className="my-page">
            <Link href="/mypage/basket">MyPage</Link>
          </span>
          <span className="sign-out" onClick={onSignout}>
            LogOut
          </span>
        </div>
      ) : (
        <div className="sign">
          <span className="sign-in">
            <Link href="/signin">SignIn</Link>
          </span>
          <span className="sign-up">
            <Link href="/signup">SignUp</Link>
          </span>
        </div>
      )}

      <style jsx>
        {`
          .nav {
            position: sticky;
            top: 0;
            min-width: 200px;
            width: 200px;
            height: 100vh;
            background: rgba($color: #ffffff, $alpha: 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1;
            .logo {
              font-size: 40px;
              font-weight: bolder;
              margin-top: 30px;
              margin-bottom: 50px;
            }
            .nav-items {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              font-size: 20px;
              font-weight: 600;
              transition-duration: 1s;

              li {
                padding: 5px 0;
              }

              .shop {
                cursor: pointer;
              }

              .shop-sub {
                transition-duration: 0.5s;
                font-size: 15px;
                font-weight: 500;
                color: black;
                pointer-events: none;
              }
            }

            .sign {
              display: flex;
              margin-top: 30px;
              span {
                margin: 0 3px;
                font-weight: 700;
              }
            }

            .my {
              display: flex;
              margin-top: 30px;
              span {
                margin: 0 3px;
                font-weight: 700;
              }
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navigation;
