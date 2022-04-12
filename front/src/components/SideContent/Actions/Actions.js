import peact from "../../../core/peact";
import Action from "../Action/Action";
import styles from "./actions.module.css";

const Actions = () => {
  const $actionsWrap = peact.createElement({
    tag: "div",
    className: styles.actionWrap,
    child: [Action(), Action()],
  });

  return peact.createElement({
    tag: "div",
    className: styles.actions,
    child: [$actionsWrap],
  });
};

export default Actions;
