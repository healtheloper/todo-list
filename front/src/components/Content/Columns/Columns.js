import peact from "../../../core/peact";
import Cards from "../Cards/Cards";
import CardWritable from "../CardWritable/CardWritable";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import styles from "./columns.module.css";

const Columns = ({ columns, todos, handleRenderFlag }) => {
  const getTodosByColumnId = (columnId) => {
    return todos.filter((todo) => todo.columnId === columnId);
  };

  const createColumnHeaderElement = ({ column, handleNewCardVisibility }) =>
    ColumnHeader({
      column,
      todos: getTodosByColumnId(column._id),
      handleNewCardVisibility,
    });

  const createCardsElement = ({ $newCard, column }) =>
    Cards({
      $newCard,
      todos: getTodosByColumnId(column._id),
      handleRenderFlag,
    });

  const createColumnElement = (column) => {
    const newCardRef = peact.useRef();
    const handleNewCardVisibility = () => {
      console.log(newCardRef.current);
      newCardRef.current.classList.toggle(styles.visible);
    };
    const $newCard = CardWritable({ handleNewCardVisibility, ref: newCardRef });

    return peact.createElement({
      tag: "div",
      className: styles.column,
      child: [
        createColumnHeaderElement({ column, handleNewCardVisibility }),
        createCardsElement({ $newCard, column }),
      ],
    });
  };

  return peact.createElement({
    tag: "div",
    className: styles.content,
    child: columns.map(createColumnElement),
  });
};

export default Columns;
