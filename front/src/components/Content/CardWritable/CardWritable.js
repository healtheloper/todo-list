import peact from "../../../core/peact";
import styles from "./cardWritable.module.css";

const CardWritable = () => {
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

  const $cancelButton = peact.createElement({
    tag: "button",
    className: [styles.button, styles.cancelButton],
    child: ["취소"],
  });

  const $confirmButton = peact.createElement({
    tag: "button",
    className: [styles.button, styles.confirmButton, styles.activeButton],
    child: ["등록"],
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
