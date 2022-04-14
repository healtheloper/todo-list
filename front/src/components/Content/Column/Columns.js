import peact from "../../../core/peact";
import Cards from "../Cards/Cards";
import CardWritable from "../CardWritable/CardWritable";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import styles from "./columns.module.css";

const Columns = ({ columns, todos, handleRenderFlag }) => {
  const getTodosByColumnId = (columnId) => {
    return todos.filter((todo) => todo.columnId === columnId);
  };

  const getColumnHeaderElement = ({ column, handleNewCardVisibility }) =>
    ColumnHeader({
      column,
      todos: getTodosByColumnId(column._id),
      handleNewCardVisibility,
    });

  const getCardsElement = ({ $newCard, column }) =>
    Cards({
      $newCard,
      todos: getTodosByColumnId(column._id),
      handleRenderFlag,
    });

  const getColumnElement = (column) => {
    const $newCard = CardWritable({ handleNewCardVisibility });
    function handleNewCardVisibility() {
      $newCard.classList.toggle(styles.visible);
    }

    return peact.createElement({
      tag: "div",
      className: styles.column,
      child: [
        getColumnHeaderElement({ column, handleNewCardVisibility }),
        getCardsElement({ $newCard, column }),
      ],
    });
  };

  return peact.createElement({
    tag: "div",
    className: styles.content,
    child: columns.map(getColumnElement),
  });
};

export default Columns;
