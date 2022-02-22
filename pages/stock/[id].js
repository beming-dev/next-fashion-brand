import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { LoginContext } from "../../components/Layout";

const StockPage = () => {
  const { login, setLogin } = useContext(LoginContext);
  const router = useRouter();
  const { id } = router.query;
  const [itemInfo, setItemInfo] = useState({ description: "init" });

  useEffect(() => {
    axios({
      url: `http://localhost:3031/request/stock/${id}`,
      method: "POST",
      header: { "Content-Type": "application/json" },
    }).then((data) => {
      setItemInfo(data.data);
    });
  }, []);

  const onBasket = () => {
    if (login) {
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
    } else {
      alert("로그인 후 이용 부탁드립니다.");
    }
  };

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

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default StockPage;
