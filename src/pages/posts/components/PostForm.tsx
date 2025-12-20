const PostForm = () => {
  // useAsync(async () => {}, []);

  return (
    <div>
      <form className="post-form" onSubmit={() => document.getElementById('confirmModalBtn')?.click()}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">제목</legend>
          <input type="text" className="input" placeholder="제목을 입력하세요" />
          <p className="label">....</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">내용</legend>
          <input type="text" className="input" placeholder="내용을 입력하세요" />
          <p className="label">....</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">카테고리</legend>
          <input type="text" className="input" placeholder="카테고리를 입력하세요" />
          <p className="label">....</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">태그</legend>
          <input type="text" className="input" placeholder="태그를 입력하세요" />
          <p className="label">....</p>
        </fieldset>
        <button type="submit">글 쓰기</button>
        {/*
            "id": "p_abc123",
            "userId": "u_1",
            "title": "Sample Post #1",
            "body": "Hello world",
            "category": "NOTICE",
            "tags": [
              "react",
              "ts"
            ],
            "createdAt": "2025-12-20T13:02:04.291Z"
          */}
      </form>
    </div>
  );
};

export default PostForm;
