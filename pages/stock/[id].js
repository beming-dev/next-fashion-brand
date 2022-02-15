import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import parse from "html-react-parser";

const StockPage = ({ isSignin }) => {
  const router = useRouter();
  const { id } = router.query;
  const [itemInfo, setItemInfo] = useState({ description: "" });

  const onBasket = () => {
    axios({
      url: "http://localhost:3031/request/basket",
      method: "POST",
      header: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
      },
      data: { stockId: itemInfo.stock_id },
      withCredentials: true,
    }).then((success) => {
      if (success.data) {
        alert("장바구니에 들어갔습니다.");
      } else {
        alert("err");
      }
    });
  };

  useEffect(() => {
    axios({
      url: `http://localhost:3031/request/stock/${id}`,
      method: "POST",
      header: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data);
      setItemInfo(data.data);
    });
  }, []);

  return (
    <div className="stock-page">
      <div className="content">
        <div className="item">
          <div className="top">
            <img src="" alt="stock thumbnail" />
            <div className="detail">
              <span className="name">{itemInfo.name}</span>
              <span className="price">{itemInfo.price}won</span>
              <div className="buttons">
                <button onClick={onBasket}>장바구니</button>
                <button>구매</button>
                <button>하트</button>
              </div>
            </div>
          </div>
          <div className="bottom">
            <span className="description">{parse(itemInfo.description)}</span>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .stock-page {
            width: 100vw;
            height: 100vh;
            display: flex;

            .content {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;

              .item {
                display: flex;
                flex-direction: column;

                .top {
                  display: flex;

                  img {
                    width: 200px;
                    height: 300px;
                  }

                  .detail {
                    display: flex;
                    flex-direction: column;
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

export default StockPage;
