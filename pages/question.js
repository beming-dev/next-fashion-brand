const QnAWrite = () => {
  return (
    <div className="QnA-write">
      <div className="content">
        <div className="question-form">
          <div className="title-box">
            <label htmlFor="title">제목</label>
            <input type="text" className="title" name="title" />
          </div>
          <div className="category-box">
            <label htmlFor="category">카테고리</label>
            <select name="category" id="category">
              <option value="stock">상품</option>
            </select>
          </div>
          <label htmlFor="description">내용</label>
          <input type="text" className="description" name="title" />
          <button className="submit">등록</button>
        </div>
      </div>
      <style jsx>
        {`
          .QnA-write {
            width: 100vw;
            height: 100vh;
            display: flex;

            .content {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;

              .question-form {
                width: 400px;
                height: 600px;
                display: flex;
                flex-direction: column;

                .title-box {
                  display: flex;
                  align-items: center;
                  label {
                    margin-right: 5px;
                  }
                  input {
                    flex: 1;
                  }
                }

                .category-box {
                  display: flex;
                  align-items: center;
                  width: 100%;
                  #category {
                    margin: 10px 5px;
                  }
                }

                .description {
                  margin-top: 5px;
                  flex: 1;
                }

                .submit {
                  margin-top: 10px;
                  width: 50px;
                  height: 30px;
                  align-self: flex-end;
                  background: transparent;
                  border: 1px solid black;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default QnAWrite;
