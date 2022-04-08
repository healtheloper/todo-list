import Action from "./Action/Action";
import styles from "./actions.module.css";

const Actions = () => {
  return `
    <div class="${styles.actions} ${styles.active}">
      <div class="${styles.menu}">
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
      <div class="${styles.actionWrap}">
        ${Action()}
        ${Action()}
      </div>
    </div>
  `;
};

export default Actions;
