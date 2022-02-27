import { useEffect } from "react";
import { useState } from "react";

interface stockItemType {
  stock: any;
  finalPrice: number;
  setFinalPrice: any;
  basket: any;
  setItemForPass: any;
  itemForPass: any;
}

const StockItem = ({
  stock,
  finalPrice,
  setFinalPrice,
  basket,
  setItemForPass,
  itemForPass,
}: stockItemType) => {
  const [localFinal, setLocalFinal] = useState(finalPrice);
  useEffect(() => {
    if (setFinalPrice) setFinalPrice(localFinal);
  }, [localFinal]);

  const onCheck = (box: any, price: number) => {
    let newArr = itemForPass;
    if (box.target.checked) {
      newArr.push(JSON.stringify(stock));
      setLocalFinal(finalPrice + price);
    } else {
      newArr.splice(newArr.indexOf(JSON.stringify(stock)), 1);
      setLocalFinal(finalPrice - price);
    }
    setItemForPass(newArr);
  };
  return (
    <div className="stock-item">
      <div className="content">
        <div className="basket-item" key={stock.stock_id}>
          {basket ? (
            <input
              type="checkbox"
              onClick={(box) => onCheck(box, stock.amount * stock.price)}
            />
          ) : (
            <></>
          )}
          <img src={stock.thumbnail} alt="thumbnail" className="thumbnail" />
          <span className="name">{stock.name}</span>
          <span className="price">{stock.price}</span>
          <span className="amount">{stock.amount}</span>
          <span className="total-price">{stock.amount * stock.price}</span>
        </div>
      </div>
      <style jsx>
        {`
          .stock-item {
            width: 70%;
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

export default StockItem;
