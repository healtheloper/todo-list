import peact from "../../../core/peact";
import CardWritable from "../CardWritable/CardWritable";
import styles from "./columnHeader.module.css";

const ColumnHeader = ({ column, todos }) => {
  const handlePlusButtonOverOut = ({ target }) => {
    const targetButton = target.closest(`.${styles.plusButton}`) || target;
    targetButton.classList.toggle(styles.plusButtonOver);
  };

  const onPlusButtonClick = ({ target }) => {
    const $currentHeader = target.closest(".header");
    const $cardWritable = $currentHeader.querySelector(".cardWritable");
    $cardWritable.classList.toggle(styles.display);
  };

  const handleXButtonOverOut = ({ target }) => {
    const targetButton = target.closest(`.${styles.xButton}`) || target;
    targetButton.classList.toggle(styles.xButtonOver);
  };

  const todosCount = todos.length;
  const columTitleTemplate = `<h2 class="${styles.title}">${column.title}</h2>`;
  const cardsCountTemplate = `<div class="${styles.count}">${todosCount}</div>`;

  const $columnTitleWrap = peact.createElement({
    tag: "div",
    className: styles.titleWrap,
    child: [columTitleTemplate + cardsCountTemplate],
  });

  const plusButtonImgTemplate = `
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"/>
  </svg>`;

  const $plusButton = peact.createElement({
    tag: "div",
    className: styles.plusButton,
    attrs: {
      onMouseOver: handlePlusButtonOverOut,
      onMouseOut: handlePlusButtonOverOut,
      onClick: onPlusButtonClick,
    },
    child: [plusButtonImgTemplate],
  });

  const deleteButtonImgTemplate = `
  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"/>
  </svg>`;

  const $deleteButton = peact.createElement({
    tag: "div",
    className: styles.xButton,
    attrs: {
      onMouseOver: handleXButtonOverOut,
      onMouseOut: handleXButtonOverOut,
    },
    child: [deleteButtonImgTemplate],
  });

  const $columnButtonArea = peact.createElement({
    tag: "div",
    className: styles.buttonArea,
    child: [$plusButton, $deleteButton],
  });

  const $columnTitleArea = peact.createElement({
    tag: "div",
    className: styles.titleArea,
    child: [$columnTitleWrap, $columnButtonArea],
  });

  return peact.createElement({
    tag: "div",
    className: [styles.header, "header"],
    child: [
      $columnTitleArea,
      CardWritable({ displayClassName: styles.display }),
    ],
  });
};

export default ColumnHeader;
