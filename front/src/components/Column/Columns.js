import peact from "../../core/peact";
import Cards from "./Cards/Cards";
import styles from "./columns.module.css";
import Header from "./Header/Header";

const Columns = ({ columns, todos }) => {
  const getTodosByColumnId = (columnId) => {
    return todos.filter((todo) => todo.columnId === columnId);
  };

  const getColumnTemplate = (column) => {
    return peact.createElement({
      tag: "div",
      className: styles.column,
      child: [
        Header({ column, todos: getTodosByColumnId(column._id) }),
        Cards({ todos: getTodosByColumnId(column._id) }),
      ],
    });
  };

  return peact.createElement({
    tag: "div",
    className: styles.content,
    child: columns.map(getColumnTemplate),
  });
};

export default Columns;
