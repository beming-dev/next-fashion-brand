import DaumPostcode from "react-daum-postcode";
import { useState, useEffect } from "react";
import customAxios from "../lib/customAxios";
import { useRouter } from "next/router";

interface signupInfoType {
  nickname: string;
  id: string;
  pw: string;
  pwCheck: string;
  phone: string;
  email: string;
  zipcode: string;
  address: string;
}

const Signup = () => {
  const router = useRouter();
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
  const [signupInfo, setSignupInfo] = useState<signupInfoType>({
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
  }, []);

  const editSignupInfo = async (
    num: number,
    e: React.ChangeEvent<HTMLInputElement>,
    add: string = ""
  ) => {
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
      customAxios
        .post("/signup", {
          nickname: signupInfo.nickname,
          id: signupInfo.id,
          pw: signupInfo.pw,
          phone: signupInfo.phone,
          email: signupInfo.email,
          zipcode: signupInfo.zipcode,
          address: signupInfo.address,
        })
        .then(() => {
          alert("??????????????? ??????????????????.");
          router.push("/");
        });
    }
    if (!idCheck) window.alert("???????????? ??????????????????.");
    else if (!pwCheck) window.alert("??????????????? ??????????????????.");
  };

  const postStyle: any = {
    position: "absolute",
    width: "500px",
    height: "500px",
    border: "1px solid black",
  };

  const onCompletePost = async (data: any) => {
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

  const idAvailable = (id: string) => {
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
      customAxios
        .post("/request/id", {
          id: signupInfo.id,
        })
        .then((res) => {
          if (res.data) {
            window.alert("????????? id?????????.");
          } else {
            window.alert("?????? ???????????????.");
            setIdCheck(true);
          }
        });
    } else {
      window.alert("???????????? ???????????? ????????? ?????? ?????? 6~20??? ??????????????????.");
    }
  };

  return (
    <div className="signup">
      <div className="content">
        <div className="nickname-box box">
          <label htmlFor="nickname">?????????</label>
          <input
            type="text"
            name="nickname"
            defaultValue={signupInfo.nickname}
            onChange={(e) => editSignupInfo(1, e)}
          />
        </div>
        <div className="id-box box">
          <label htmlFor="id">?????????</label>
          <input
            type="text"
            name="id"
            defaultValue={signupInfo.id}
            onChange={(e) => editSignupInfo(2, e)}
          />
          <button onClick={checkRepeat}>?????? ??????</button>
        </div>
        <div className="pw-box box">
          <label htmlFor="pw">????????????</label>
          <input
            type="text"
            name="pw"
            defaultValue={signupInfo.pw}
            onChange={(e) => editSignupInfo(3, e)}
          />
        </div>
        <div className="pw-check-box box">
          <label htmlFor="pw-check">???????????? ??????</label>
          <input
            type="text"
            name="pw-check"
            onChange={(e) => editSignupInfo(6, e)}
          />
        </div>
        <span style={checkTextStyle}>??????????????? ???????????? ????????????.</span>
        <div className="phone-box box">
          <label htmlFor="phone">????????????</label>
          <input
            type="text"
            name="phone"
            defaultValue={signupInfo.phone}
            onChange={(e) => editSignupInfo(4, e)}
          />
        </div>
        <div className="email-box box">
          <label htmlFor="email">?????????</label>
          <input
            type="text"
            name="email"
            defaultValue={signupInfo.email}
            onChange={(e) => editSignupInfo(7, e)}
          />
        </div>
        <div className="address-box box">
          <div className="line-01">
            <label htmlFor="zipcode">??????</label>
            <input type="text" name="zipcode" value={address} readOnly />
            <button onClick={() => setOpenPost(!openPost)}>?????? ??????</button>
          </div>
          <input type="text" name="address" value={addressDetail} readOnly />
          <input type="text" name="detail" placeholder="????????????" />
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
