import Question from "../components/question";
import Link from "next/link";

const QnA = () => {
  let questions = [
    {
      writer: "marvin",
      title: "안녕하세요",
      date: "2021-12-01",
      category: "상품",
      status: "답변완료",
      secret: true,
    },
    {
      writer: "marvin",
      title: "안녕하세요",
      date: "2021-12-01",
      category: "상품",
      status: "답변완료",
      secret: true,
    },
    {
      writer: "marvin",
      title: "안녕하세요",
      date: "2021-12-01",
      category: "상품",
      status: "답변완료",
      secret: true,
    },
  ];

  let qnaCount = [1, 2, 3];
  return (
    <div className="qna">
      <div className="content">
        <div className="board">
          {questions.map(
            ({ writer, title, date, category, status, secret }, idx) => (
              <Question
                key={idx}
                writer={writer}
                title={title}
                date={date}
                category={category}
                status={status}
                secret={secret}
              />
            )
          )}
        </div>
        <div className="page-control">
          {qnaCount.map((a, index) => (
            <ul key={a} className={`page-${a} page`}>
              {a}
            </ul>
          ))}
        </div>
        <button className="btn-write">
          <Link href="/question">글쓰기</Link>
        </button>
      </div>
      <style jsx>
        {`
          .qna {
            width: 100vw;
            height: 100vh;
            display: flex;

            .content {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .board {
                width: 80%;
                min-width: 400px;
                max-width: 800px;
                height: 640px;
                display: flex;
                flex-direction: column;
                border: 1px solid black;
              }

              .page-control {
                display: flex;
              }

              .btn-write {
                width: 80px;
                height: 30px;
                outline: none;
                margin-top: 15px;
                background: none;
                border: 1px solid black;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default QnA;
