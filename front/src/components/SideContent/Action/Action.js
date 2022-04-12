import peact from "../../../core/peact";
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
  const actionInnerHTML = `
    <div class="${styles.icon}">🥳</div>
    <div class="content">
        <p class="author">@sam</p>
        <p class="content">
            <strong>뭐시기</strong>를 <strong>뿅뿅</strong>에서
            <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
            <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
            <strong>짠짠</strong>으로 <strong>룰루</strong>하였습니다.
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
