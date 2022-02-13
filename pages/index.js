const Home = () => {
  return (
    <div className="home">
      <div className="background-img"></div>
      <style jsx>
        {`
          .home {
            width: 100vw;
            height: 100vh;
          }
          .background-img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: url(main.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
