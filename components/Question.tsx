interface questionType {
  writer: string;
  title: string;
  date: string;
  category: string;
  status: string;
  secret: any;
}

const Question = ({
  writer,
  title,
  date,
  category,
  status,
  secret,
}: questionType) => {
  return (
    <div className="question">
      <span className="writer">{writer}</span>
      <span className="title">{title}</span>
      <span className="date">{date}</span>
      <span className="category">{category}</span>
      <span className="status">{status}</span>
      <style jsx>
        {`
          .question {
            width: 100%;
            display: flex;
            align-items: center;

            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin: 1%;
            }

            .writer {
              width: 14%;
            }

            .title {
              width: 35%;
            }

            .date {
              width: 20%;
              font-size: 15px;
            }

            .category {
              width: 15%;
            }

            .status {
              width: 14%;
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Question;
