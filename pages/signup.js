import DaumPostcode from "react-daum-postcode";
import { useState, useEffect } from "react";
import axios from "axios";
const Signup = () => {
  const [checkTextStyle, setCheckTextStyle] = useState({
    display: "none",
    fontSize: "13px",
    color: "red",
  });
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [signupInfo, setSignupInfo] = useState({
    nickname: "",
    id: "",
    pw: "",
    pwCheck: "",
    phone: "",
    email: "",
    zipcode: "",
    address: "",
  });

  useEffect(() => {
    pwAvailable();
  }, [signupInfo.pw, signupInfo.pwCheck]);

  const editSignupInfo = async (num, e, add = "") => {
    switch (num) {
      case 1:
        setSignupInfo({
          ...signupInfo,
          nickname: `${e.target.value}`,
        });
        break;
      case 2:
        setIdCheck(false);
        setSignupInfo((signupInfo) => {
          return {
            ...signupInfo,
            id: `${e.target.value}`,
          };
        });
        break;
      case 3:
        await setSignupInfo((signupInfo) => {
          return {
            ...signupInfo,
            pw: `${e.target.value}`,
          };
        });
        break;
      case 4:
        await setSignupInfo({
          ...signupInfo,
          phone: `${e.target.value}`,
        });
        break;
      case 5:
        setSignupInfo({
          ...signupInfo,
          zipcode: `${e}`,
          address: `${add}`,
        });
        break;
      case 6:
        await setSignupInfo((signupInfo) => {
          return {
            ...signupInfo,
            pwCheck: `${e.target.value}`,
          };
        });
        break;
      case 7:
        setSignupInfo({
          ...signupInfo,
          email: `${e.target.value}`,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    if (pwCheck && idCheck) {
      axios({
        url: "http://localhost:3031/signup",
        method: "POST",
        header: {
          ACCEPT: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          nickname: signupInfo.nickname,
          id: signupInfo.id,
          pw: signupInfo.pw,
          phone: signupInfo.phone,
          email: signupInfo.email,
          zipcode: signupInfo.zipcode,
          address: signupInfo.address,
        },
      });
    }
    if (!idCheck) window.alert("아이디를 확인해주세요.");
    else if (!pwCheck) window.alert("비밀번호를 확인해주세요.");
  };

  const postStyle = {
    position: "absolute",
    width: "500px",
    height: "500px",
    border: "1px solid black",
  };

  const onCompletePost = async (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddr += data.bname;
      if (data.buildingName !== "")
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddr += extraAddr !== "" ? `(${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setOpenPost(false);
    editSignupInfo(5, data.zonecode, fullAddr);
    //editSignupInfo(6, fullAddr);
  };

  const idAvailable = (id) => {
    let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    return regExp.test(id);
  };

  const pwAvailable = () => {
    setPwCheck(false);
    setCheckTextStyle({
      ...checkTextStyle,
      display: "block",
    });
    let regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regExp.test(signupInfo.pw)) {
      if (signupInfo.pw === signupInfo.pwCheck) {
        setPwCheck(true);
        setCheckTextStyle({
          ...checkTextStyle,
          display: "none",
        });
      }
    }
  };

  const checkRepeat = () => {
    if (idAvailable(signupInfo.id)) {
      axios({
        url: "http://localhost:3031/request/id",
        method: "POST",
        header: {
          ACCEPT: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          id: signupInfo.id,
        },
      }).then((res) => {
        if (res.data) {
          window.alert("중복된 id입니다.");
        } else {
          window.alert("사용 가능합니다.");
          setIdCheck(true);
        }
      });
    } else {
      window.alert("영문자로 시작하는 영문자 또는 숫자 6~20자 입력해주세요.");
    }
  };

  return (
    <div className="signup">
      <div className="content">
        <div className="nickname-box box">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            name="nickname"
            defaultValue={signupInfo.nickname}
            onChange={(e) => editSignupInfo(1, e)}
          />
        </div>
        <div className="id-box box">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            name="id"
            defaultValue={signupInfo.id}
            onChange={(e) => editSignupInfo(2, e)}
          />
          <button onClick={checkRepeat}>중복 확인</button>
        </div>
        <div className="pw-box box">
          <label htmlFor="pw">비밀번호</label>
          <input
            type="text"
            name="pw"
            defaultValue={signupInfo.pw}
            onChange={(e) => editSignupInfo(3, e)}
          />
        </div>
        <div className="pw-check-box box">
          <label htmlFor="pw-check">비밀번호 확인</label>
          <input
            type="text"
            name="pw-check"
            onChange={(e) => editSignupInfo(6, e)}
          />
        </div>
        <span style={checkTextStyle}>비밀번호가 일치하지 않습니다.</span>
        <div className="phone-box box">
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            name="phone"
            defaultValue={signupInfo.phone}
            onChange={(e) => editSignupInfo(4, e)}
          />
        </div>
        <div className="email-box box">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            defaultValue={signupInfo.email}
            onChange={(e) => editSignupInfo(7, e)}
          />
        </div>
        <div className="address-box box">
          <div className="line-01">
            <label htmlFor="zipcode">주소</label>
            <input type="text" name="zipcode" value={address} readOnly />
            <button onClick={() => setOpenPost(!openPost)}>주소 찾기</button>
          </div>
          <input type="text" name="address" value={addressDetail} readOnly />
          <input type="text" name="detail" placeholder="상세주소" />
        </div>
        <input type="submit" onClick={onSubmit} />
        {openPost ? (
          <DaumPostcode
            autoClose
            onComplete={onCompletePost}
            style={postStyle}
          />
        ) : (
          <></>
        )}
      </div>
      <style jsx>
        {`
          .signup {
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

              .box {
                width: 300px;
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
              }

              .address-box {
                flex-direction: column;

                .line-01 {
                  display: flex;
                  align-items: center;
                  button {
                    flex: 1;
                    height: 100%;
                  }
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
