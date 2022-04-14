import peact from "../../../core/peact";
import Button from "../../../tagComponents/Button";
import styles from "./cardWritable.module.css";

const activateButton = ($button, activeClassName) => {
  $button.removeAttribute("disabled");
  $button.classList.add(activeClassName);
  $button.style.cursor = "pointer";
};

const deactivateButton = ($button, activeClassName) => {
  $button.setAttribute("disabled", "");
  $button.classList.remove(activeClassName);
  $button.style.cursor = "default";
};

const CardWritable = ({
  handleNewCardVisibility,
  handleSubmitForm,
  inputValues,
  ref,
}) => {
  const addButtonRef = peact.useRef();

  const handleKeyUpInput = ({ target }) => {
    const $addButton = addButtonRef.current;
    const isInputEmpty = target.value === "";
    const isInputActive = $addButton.classList.contains(styles.activeButton);
    if (isInputEmpty && isInputActive) {
      deactivateButton($addButton, styles.activeButton);
    } else if (!isInputActive) {
      activateButton($addButton, styles.activeButton);
    }
  };

  const $inputAuthor = peact.createElement({
    tag: "input",
    className: styles.author,
    attrs: {
      value: inputValues ? inputValues.author : "",
      type: "hidden",
      name: "author",
    },
    child: [],
  });

  const $inputDesc = peact.createElement({
    tag: "input",
    className: styles.cardDescInput,
    attrs: {
      value: inputValues ? inputValues.desc : "",
      type: "text",
      name: "desc",
      placeholder: "내용을 입력하세요",
      onKeyUp: handleKeyUpInput,
    },
    child: [],
  });

  const $inputTitle = peact.createElement({
    tag: "input",
    className: styles.cardTitleInput,
    attrs: {
      value: inputValues ? inputValues.title : "",
      type: "text",
      name: "title",
      placeholder: "제목을 입력하세요",
      onKeyUp: handleKeyUpInput,
    },
    child: [],
  });

  const $cardWritableHeader = peact.createElement({
    tag: "div",
    className: styles.headerArea,
    child: [$inputTitle],
  });

  const $cancelButton = Button({
    onClick: handleNewCardVisibility,
    className: [styles.button, styles.cancelButton],
    innerHTML: "취소",
    type: "button",
  });

  const $confirmButton = Button({
    className: [styles.button, styles.confirmButton, styles.activeButton],
    innerHTML: "등록",
    type: "submit",
    ref: addButtonRef,
  });

  const $buttonArea = peact.createElement({
    tag: "div",
    className: styles.buttons,
    child: [$cancelButton, $confirmButton],
  });

  return peact.createElement({
    tag: "form",
    className: styles.cardWritable,
    attrs: {
      onSubmit: handleSubmitForm,
    },
    child: [$inputAuthor, $cardWritableHeader, $inputDesc, $buttonArea],
    ref,
  });
};

export default CardWritable;
