import { LOG_TYPE } from "../../../common/constants";
import peact from "../../../core/peact";
import columnApi from "../../../service/columnApi";
import styles from "./action.module.css";

/*
 * type: move
 * ${fromColumnTitle} 에서 ${toColumnTitle} 로 이동하였습니다.
 */

/*
 * type: create
 * ${columnTitle} 에 ${todoTitle} 를 등록하였습니다.
 */
/*
 * type: update
 * ${columnTitle} 에 ${todoTitle} 를 수정하였습니다.
 */
/*
 * type: delete
 * ${columnTitle} 에 ${todoTitle} 를 삭제하였습니다.
 */

const Action = ({ todoLog }) => {
  const { columnTitle, title, author, type } = todoLog;

  const actionInnerHTML = `
    <div class="${styles.icon}">🥳</div>
    <div class="content">
        <p class="author">${author}</p>
        <p class="content">
            <strong>${columnTitle}</strong>에 <strong>${title}</strong>를
            <strong>${LOG_TYPE[type]}</strong>하였습니다.
        </p>
        <p class="${styles.time}">1분 전</p>
    </div>
  `;
  return peact.createElement({
    tag: "div",
    className: styles.action,
    child: [actionInnerHTML],
  });
};

export default Action;
