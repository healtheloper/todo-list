import peact from "../../../core/peact";
import Modal from "../../Modal/Modal";
import styles from "./card.module.css";

const showAlert = () => {
  const $body = document.querySelector("body");
  $body.append(Modal());
};

const handleXButton = (target) => {
  if (!target.classList.contains(styles.xButton)) {
    return;
  }

  const $path = target.querySelector(`.${styles.path}`);
  const $cardElement = target.closest(`.${styles.card}`);

  $path.classList.toggle(styles.pathMouseOver);
  $cardElement.classList.toggle(styles.cardMouseOver);
};

const onXButtonOver = ({ target }) => {
  handleXButton(target);
};

const onXButtonOut = ({ target }) => {
  handleXButton(target);
};

const onXButtonClick = ({ target }) => {
  if (!target.classList.contains(styles.xButton)) {
    return;
  }
  showAlert();
};

const Card = ({ todo }) => {
  const cardInnerHTML = `
    <form class="${styles.card}">
      <div class="${styles.headerArea}">
        <label class="${styles.title}">${todo.title}</label>
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="${styles.xButton}"
          >
            <path
              d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
              class="${styles.path}"
            />
          </svg>
        </div>
      </div>
      <div>
        <label class="${styles.cardContent}">${todo.desc}</label>
      </div>
      <div class="${styles.author}">${todo.author}</div>
    </form>
  `;

  return peact.createElement({
    tag: "form",
    className: styles.card,
    attrs: {
      onMouseOver: onXButtonOver,
      onMouseOut: onXButtonOut,
      onClick: onXButtonClick,
    },
    child: [cardInnerHTML],
  });
};

export default Card;
