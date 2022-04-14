import peact from "../../../core/peact";
import Button from "../../../tagComponents/Button";
import styles from "./cardWritable.module.css";

const CardWritable = ({ displayClassName }) => {
  const $inputDesc = peact.createElement({
    tag: "div",
    child: [
      `<input type="text" value="" class="${styles.cardDescInput}" name="card-content" placeholder="내용을 입력하세요"/>`,
    ],
  });

  const $inputTitle = peact.createElement({
    tag: "input",
    className: styles.cardTitleInput,
    attrs: {
      value: "",
      type: "text",
      name: "name-title",
      placeholder: "제목을 입력하세요",
    },
    child: [],
  });

  const $cardWritableHeader = peact.createElement({
    tag: "div",
    className: styles.headerArea,
    child: [$inputTitle],
  });

  const onCancelButtonClick = ({ target }) => {
    const $cardWritable = target.closest(`.${"cardWritable"}`);
    $cardWritable.classList.toggle(displayClassName);
  };

  const $cancelButton = Button({
    onClick: onCancelButtonClick,
    className: [styles.button, styles.cancelButton],
    innerHTML: "취소",
  });

  const $confirmButton = Button({
    className: [styles.button, styles.confirmButton, styles.activeButton],
    innerHTML: "등록",
  });

  const $buttonArea = peact.createElement({
    tag: "div",
    className: styles.buttons,
    child: [$cancelButton, $confirmButton],
  });

  return peact.createElement({
    tag: "div",
    className: [styles.cardWritable, "cardWritable", styles.hidden],
    child: [$cardWritableHeader, $inputDesc, $buttonArea],
  });
};

export default CardWritable;
