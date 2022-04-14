import peact from "../../../core/peact";
import Cards from "../Cards/Cards";
import CardWritable from "../CardWritable/CardWritable";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import styles from "./columns.module.css";

const Columns = ({ columns, todos, handleRenderFlag }) => {
  const getTodosByColumnId = (columnId) => {
    return todos.filter((todo) => todo.columnId === columnId);
  };

  const getColumnHeaderElement = ({ column, handleCardWritableVisibility }) =>
    ColumnHeader({
      column,
      todos: getTodosByColumnId(column._id),
      handleCardWritableVisibility,
    });

  const getCardsElement = ({ $cardWritable, column }) =>
    Cards({
      $cardWritable,
      todos: getTodosByColumnId(column._id),
      handleRenderFlag,
    });

  const getColumnElement = (column) => {
    const $cardWritable = CardWritable();
    const handleCardWritableVisibility = () => {
      $cardWritable.classList.toggle(styles.visible);
    };

    return peact.createElement({
      tag: "div",
      className: styles.column,
      child: [
        getColumnHeaderElement({ column, handleCardWritableVisibility }),
        getCardsElement({ $cardWritable, column }),
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
