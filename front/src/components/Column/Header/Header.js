import peact from "../../../core/peact";
import styles from "./header.module.css";

const Header = ({ column, todos }) => {
  const todosCount = todos.length;

  const headerInnerHTML = `
        <div class="${styles.titleWrap}">
            <h2 class="${styles.title}">${column.title}</h2>
            <div class="${styles.count}">${todosCount}</div>
        </div>
        <div class="${styles.buttonArea}">
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
  `;
  return peact.createElement({
    tag: "div",
    className: styles.header,
    child: [headerInnerHTML],
  });
};

export default Header;
