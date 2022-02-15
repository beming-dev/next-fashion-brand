import Link from "next/link";

const Stock = ({ url, name, price, id }) => {
  return (
    <Link href={`/stock/${id}`}>
      <div>
        <div className="stock">
          {/* <img src={require(`./${url}`).default} alt="item-img" /> */}
          <img src="" alt="stockImg" />
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>
        <style jsx>
          {`
            .stock {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 10px 5px;
              width: 200px;
              height: 300px;

              img {
                width: 100%;
                height: 200px;
              }
            }
          `}
        </style>
      </div>
    </Link>
  );
};

export default Stock;
