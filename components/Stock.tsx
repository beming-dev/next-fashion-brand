import Link from "next/link";

interface stockType {
  name: string;
  price: number;
  id: number;
}

const Stock = ({ name, price, id }: stockType) => {
  return (
    <Link href={`/stock/${id}`}>
      <a>
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
      </a>
    </Link>
  );
};

export default Stock;
