import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import peact from "./core/peact";
import columnApi from "./service/columnApi";
import todoApi from "./service/todoApi";

const App = () => {
  const [actionDisplay, setActionDisplay] = peact.useState("none");
  const [todos, setTodos] = peact.useState([]);
  const [columns, setColumns] = peact.useState([]);

  const handleActionDisplay = ({ target }) => {
    const display = actionDisplay === "none" ? "visible" : "none";
    setActionDisplay(display);
  };

  peact.useEffect(() => {
    const fetchTodos = async () => {
      const newTodos = await todoApi.getTodos();
      setTodos(newTodos);
    };
    const fetchColumns = async () => {
      const newColumns = await columnApi.getColumns();
      setColumns(newColumns);
    };
    fetchColumns();
    fetchTodos();
  }, []);

  const $todoListArea = peact.createElement({
    tag: "div",
    className: styles.todolistArea,
    child: [
      Header({ onMenuClick: handleActionDisplay }),
      Main({ columns, todos }),
    ],
  });

  return peact.createElement({
    tag: "div",
    className: styles.wrap,
    child: [$todoListArea, Actions({ display: actionDisplay })],
  });
};

export default App;
