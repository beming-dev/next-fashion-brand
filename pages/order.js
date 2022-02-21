import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DaumPostcode from "react-daum-postcode";
import StockItem from "../components/StockItem";

const Order = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [openPost, setOpenPost] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [payData, setPayData] = useState({
    pg: "kakaopay", // PG사
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    amount: router.query.price, // 결제금액
    name: "아임포트 결제 데이터 분석", // 주문명
    buyer_name: "홍길동", // 구매자 이름
    buyer_tel: "01012341234", // 구매자 전화번호
    buyer_email: "example@example", // 구매자 이메일
    buyer_addr: "신사동 661-16", // 구매자 주소
    buyer_postcode: "06018", // 구매자 우편번호
  });

  useEffect(() => {
    setTotalPrice(router.query.price);
    axios({
      url: "http://localhost:3031/request/userInfo",
      method: "POST",
      withCredentials: true,
    }).then(({ data }) => {
      // setPayData({
      //   ...payData,
      //   buyer_name: data.nickname,
      //   buyer_tel: data.phone,
      //   buyer_email: data.email,
      // });
      setPayData((state) => ({
        ...state,
        buyer_name: data.nickname,
        buyer_tel: data.phone,
        buyer_email: data.email,
      }));
    });
  }, [router.query.price]);

  useEffect(() => {
    setPayData((state) => ({
      ...state,
      amount: totalPrice,
    }));
  }, [totalPrice]);

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
    setPayData({
      ...payData,
      buyer_addr: fullAddr,
      buyer_postcode: data.zonecode,
    });
  };

  const onPayRequest = () => {
    const { IMP } = window;
    if (IMP) {
      IMP.init("imp85727494");
      IMP.request_pay(payData, callback);
    } else {
      console.log(window);
    }
  };

  const callback = (res) => {
    const { success, error_msg } = res;
    if (success) {
      alert("결제 성공");
      axios({
        url: "http://localhost:3031/request/payComplete",
        method: "POST",
        data: {
          items: JSON.parse(router.query.selectedItem),
          order_id: router.query.order_id,
        },
      });
      router.push("/");
    } else alert(`결제 실패: ${error_msg}`);
  };

  return (
    <div className="order-page">
      <div className="content">
        {JSON.parse(router.query.selectedItem).map((stock) => {
          stock = JSON.parse(stock);
          return (
            <StockItem
              key={stock.stock_id}
              setTotalPrice={setTotalPrice}
              stock={stock}
              basket={false}
            />
          );
        })}
        <div className="address-box box">
          <div className="line-01">
            <label htmlFor="zipcode">주소</label>
            <input type="text" name="zipcode" value={address} readOnly />
            <button onClick={() => setOpenPost(!openPost)}>주소 찾기</button>
          </div>
          <input type="text" name="address" value={addressDetail} readOnly />
          <input type="text" name="detail" placeholder="상세주소" />
        </div>
        {openPost ? (
          <DaumPostcode
            autoClose
            onComplete={onCompletePost}
            style={postStyle}
          />
        ) : (
          <></>
        )}
        <span className="total-price">{totalPrice}</span>
        <button className="pay-request" onClick={onPayRequest}>
          결제
        </button>
      </div>
      <style jsx>
        {`
          .order-page {
            width: 100%;

            .content {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .address-box {
                display: flex;
                flex-direction: column;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Order;
