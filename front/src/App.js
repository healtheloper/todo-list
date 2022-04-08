import styles from "./App.module.css";

console.log(styles);

const App = () => {
  return `
    <div class="${styles.wrap}">
        <div class="${styles.todolistArea}">
            <header class="${styles.headerTitleArea}">
            <h1 class="${styles.title}">TO-DO LIST</h1>
            <div class="menu">
                <svg
                width="17"
                height="11"
                viewBox="0 0 17 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M0 1V0H17V1H0ZM17 5V6H0V5H17ZM0 10H17V11H0V10Z"
                    fill="black"
                />
                </svg>
            </div>
            </header>

            <div class="content-area">
            <div class="column">
                <div class="header-area">
                <div class="title-wrap">
                    <h2 class="title">할 일</h2>
                    <div class="count">1</div>
                </div>
                <div class="button-area">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z" fill="#BDBDBD"/>
                    </svg>
                    
                    <path
                        d="M0.105709 7.53033L0.105709 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105709Z"
                        fill="black"
                    />
                    </svg>

                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z" fill="#BDBDBD"/>
                    </svg>
                    
                </div>
                </div>

                <div class="cards-area">
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
            </div>
            </div>
        </div>

        <div class="log-area active">
            <div class="menu">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.750004L6 5.25L10.5 0.750004L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                fill="#010101"
                />
            </svg>
            </div>

            <div class="logs-wrap">
            <div class="log">
                <div class="icon">🥳</div>

                <div class="log-content">
                <p class="author">@sam</p>
                <p class="log-content">
                    <strong>뭐시기</strong>를 <strong>뿅뿅</strong>에서
                    <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
                    <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
                    <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
                </p>
                <p class="time">1분 전</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  `;
};

export default App;
