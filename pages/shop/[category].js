import Stock from "../../components/stock";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const Shop = () => {
  const router = useRouter();
  const { category } = router.query;
  const [stockList, setStockList] = useState([]);
  useEffect(() => {
    axios({
      url: `http://localhost:3031/request/stocklist/${category}`,
      header: { "Content-Type": "application/json" },
      method: "POST",
    }).then((data) => {
      setStockList(data.data);
    });
  }, [router]);
  return (
    <div className="shop-page">
      <div className="content">
        <span className="sort">{category}</span>
        <div className="item-list">
          {stockList.map((stock) => (
            <Stock
              key={stock.stock_id}
              name={stock.name}
              price={stock.price}
              id={stock.stock_id}
            />
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .shop-page {
            width: 100%;
            height: 100%;
            display: flex;
            .content {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;

              .sort {
                margin: 50px 0;
              }
            }

            .item-list {
              max-width: 900px;
              display: flex;
              justify-content: space-evenly;
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Shop;
