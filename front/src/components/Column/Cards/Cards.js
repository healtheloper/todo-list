import styles from "./cards.module.css";

const Cards = () => {
  return `
    <div class="${styles.cards}">
        <form class="card write" draggable="true">
        <div class="header-area">
          <label class="title">공부하기</label>
          <input type="text" value="" class="card-input title" name="card-title" placeholder="제목을 입력하세요"/>
          <div class="button">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                fill="#828282"
              />
            </svg>
          </div>
        </div>
        <div class="card-content-area">
          <label class="content-label">BODY</label>
          <input type="text" value="" class="card-input" name="card-content" placeholder="내용을 입력하세요"/>
        </div>
        <div class="author">author</div>
        <div class="buttons">
          <button type="button" class="cancel-btn">취소</button>
          <button type="submit" class="confirm-btn active">등록</button>
        </div>
      </form>
    </div>
    `;
};

export default Cards;
