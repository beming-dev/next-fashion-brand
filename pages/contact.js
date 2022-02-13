const Contact = () => {
  return (
    <div className="contact">
      <div className="background-img"></div>
      <div className="background-cover">
        <span className="email">E-mail: codesupport@gmail.com</span>
        <span className="phone">phone-num: 010-xxxx-xxxx</span>
      </div>
      <style jsx>
        {`
          .contact {
            display: flex;
            width: 100%;
            height: 100vh;
            .background-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: url("./main.jpg");
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }

            .background-cover {
              z-index: 1;
              width: 100%;
              height: 100%;
              background: rgba($color: #000000, $alpha: 0.5);

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              span {
                color: white;
                font-size: 25px;
                margin: 10px 0;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
