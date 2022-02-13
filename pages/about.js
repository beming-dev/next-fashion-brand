const About = () => {
  return (
    <div className="about">
      <div className="content">
        <img src="/cloth.jpg" alt="cloth" className="img-cloth" />
        <span className="txt-01">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          exercitationem consectetur ullam ea, accusantium aut deserunt quasi
          officia, ipsum impedit a aliquid ipsa provident obcaecati. Earum harum
          quia blanditiis voluptate?
        </span>
      </div>
      <style jsx>
        {`
          .about {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            .content {
              display: flex;
              flex-direction: column;
              align-items: center;

              .img-cloth {
                width: 60%;
                margin-bottom: 50px;
              }

              .txt-01 {
                font-size: 20px;
                width: 60%;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;
