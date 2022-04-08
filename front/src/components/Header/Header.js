import styles from "./header.module.css";

const Header = () => {
  return `
    <header class="${styles.titleArea}">
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
    `;
};

export default Header;
