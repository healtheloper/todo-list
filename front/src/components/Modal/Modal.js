import peact from "../../core/peact";
import styles from "./modal.module.css";

const Modal = () => {
  const hideAlert = () => {
    const $body = document.querySelector("body");
    const $alert = $body.querySelector(`.${styles.modalWrap}`);
    $body.removeChild($alert);
  };

  const onModalClick = ({ target }) => {
    if (target.classList.contains(styles.modalWrap)) {
      hideAlert();
    }
  };

  const $modalPopupMessage = peact.createElement({
    tag: "p",
    className: styles.alertMessage,
    child: ["선택한 카드를 삭제할까요?"],
  });

  const $modalPopupCalcelButton = peact.createElement({
    tag: "button",
    className: styles.cancelButton,
    attrs: {
      onClick: hideAlert,
    },
    child: ["취소"],
  });

  const $modalPopupDeleteButton = peact.createElement({
    tag: "button",
    className: styles.deleteButton,
    child: ["삭제"],
  });

  const $modalPopupButtons = peact.createElement({
    tag: "div",
    className: styles.modalButtons,
    child: [$modalPopupCalcelButton, $modalPopupDeleteButton],
  });

  const $modalPopup = peact.createElement({
    tag: "div",
    className: styles.modalPopup,
    child: [$modalPopupMessage, $modalPopupButtons],
  });

  return peact.createElement({
    tag: "div",
    className: styles.modalWrap,
    child: [$modalPopup],
    attrs: {
      onClick: onModalClick,
    },
  });
};

export default Modal;
