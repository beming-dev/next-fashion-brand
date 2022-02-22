import Image from "next/image";

const About = () => {
  return (
    <div className="about">
      <div className="content">
        <div className="image-box">
          <Image src="/cloth.jpg" alt="cloth" width={1000} height={700} />
        </div>
        {/* <img src="/cloth.jpg" alt="cloth" className="img-cloth" /> */}
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

              .image-box {
                position: relative;
                display: block;
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
