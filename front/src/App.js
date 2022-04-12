import styles from "./App.module.css";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import SideContent from "./components/SideContent/SideContent";
import peact from "./core/peact";
import columnApi from "./service/columnApi";
import todoApi from "./service/todoApi";

const App = () => {
  const [todos, setTodos] = peact.useState([]);
  const [columns, setColumns] = peact.useState([]);

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
    child: [Header(), Content({ columns, todos })],
  });

  return peact.createElement({
    tag: "div",
    className: styles.wrap,
    child: [$todoListArea, SideContent()],
  });
};

export default App;
