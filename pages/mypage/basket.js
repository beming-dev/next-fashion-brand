import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StockItem from "../../components/StockItem";

const MyBasket = () => {
  const [itemInfo, setItemInfo] = useState([]);
  const [itemForPass, setItemForPass] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useRouter();

  const onPay = () => {
    if (finalPrice === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    axios({
      url: "http://localhost:3031/create/order",
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.data.id === 0) alert("err");
      else {
        // "/order", {
        //     state: {
        //         order_id: res.data.id,
        //       items: itemInfo,
        //       price: finalPrice,
        //       selectedItem: itemForPass,
        //     },
        //   }
        navigate.push({
          pathname: "/order",
          query: {
            order_id: res.data.id,
            items: itemInfo,
            price: finalPrice,
            selectedItem: JSON.stringify(itemForPass),
          },
        });
      }
    });
  };

  useEffect(() => {
    axios({
      url: "http://localhost:3031/request/userOrder",
      method: "POST",
      withCredentials: true,
    }).then(({ data }) => {
      setItemInfo(data);
    });
  }, []);

  useEffect(() => {
    console.log(itemForPass);
  }, [itemForPass]);

  return (
    <div className="my-basket">
      <div className="content">
        <span className="title">장바구니</span>
        {itemInfo.map((stock) => (
          <StockItem
            stock={stock}
            setFinalPrice={setFinalPrice}
            setItemForPass={setItemForPass}
            itemForPass={itemForPass}
            finalPrice={finalPrice}
            basket={true}
            key={stock.stock_id}
          />
        ))}
        <span className="final-price">{finalPrice}</span>
        <button className="pay" onClick={onPay}>
          결제하기
        </button>
      </div>
      <style jsx>
        {`
          .my-basket {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            .content {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;

              .title {
                margin-bottom: 50px;
              }

              .basket-item {
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
            }

            .final-price {
              margin-top: 50px;
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MyBasket;
