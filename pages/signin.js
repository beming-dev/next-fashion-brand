import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../components/layout";

const Signin = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useRouter();
  const [signinInfo, setSigninInfo] = useState({
    id: "",
    pw: "",
  });
  const onIdChange = (e) => {
    setSigninInfo({
      ...signinInfo,
      id: e.target.value,
    });
  };
  const onPwChange = (e) => {
    setSigninInfo({
      ...signinInfo,
      pw: e.target.value,
    });
  };
  const onSubmit = () => {
    let idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!idRegExp.test(signinInfo.id)) {
      window.alert("아이디를 확인해주세요");
      return;
    }
    let pwRegExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!pwRegExp.test(signinInfo.pw)) {
      window.alert("비밀번호를 확인해주세요");
      return;
    }

    let url = "http://localhost:3031/signin";
    axios({
      url: url,
      method: "POST",
      header: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        id: signinInfo.id,
        pw: signinInfo.pw,
      },
      withCredentials: true,
    }).then((res) => {
      switch (res.data) {
        case "id":
          window.alert("존재하지 않는 아이디 입니다.");
          break;
        case "pw":
          window.alert("비밀번호가 일치하지 않습니다.");
          break;
        case "success":
          window.alert("성공");
          loginContext.setLogin(true);
          navigate.back();
          break;
        default:
          break;
      }
    });
  };
  return (
    <div className="signin">
      <div className="content">
        <div className="submit-box">
          <div className="input-field">
            <div className="id-box">
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                name="id"
                onChange={(e) => {
                  onIdChange(e);
                }}
              />
            </div>
            <div className="pw-box">
              <label htmlFor="pw">비밀번호</label>
              <input
                type="text"
                name="pw"
                onChange={(e) => {
                  onPwChange(e);
                }}
              />
            </div>
          </div>
          <input type="submit" className="btn-signin" onClick={onSubmit} />
        </div>
        <div className="forget-box">
          <span className="forget-id">아이디 찾기</span>
          <span className="forget-pw">비밀번호 찾기</span>
        </div>
      </div>
      <style jsx>
        {`
          .signin {
            width: 100vw;
            height: 100vh;
            display: flex;

            .content {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .submit-box {
                display: flex;
                .input-field {
                  display: flex;
                  flex-direction: column;

                  .id-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    input {
                      margin-left: 10px;
                    }
                  }
                  .pw-box {
                    display: flex;
                    align-items: center;
                    input {
                      margin-left: 10px;
                    }
                  }
                }
                .btn-signin {
                  margin-left: 10px;
                  background: transparent;
                  border: 1px solid black;
                }
              }

              .forget-box {
                margin-top: 10px;
                span {
                  font-size: 15px;
                  text-decoration: underline;
                  margin: 0 5px;
                }
              }
            }
          }

          .admin-signin {
            flex: 1;
            .content {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .submit-box {
                display: flex;
                .input-field {
                  display: flex;
                  flex-direction: column;

                  .id-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    input {
                      margin-left: 10px;
                    }
                  }
                  .pw-box {
                    display: flex;
                    align-items: center;
                    input {
                      margin-left: 10px;
                    }
                  }
                }
                .btn-signin {
                  margin-left: 10px;
                  background: transparent;
                  border: 1px solid black;
                }
              }

              .forget-box {
                margin-top: 10px;
                span {
                  font-size: 15px;
                  text-decoration: underline;
                  margin: 0 5px;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Signin;
