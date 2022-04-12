import peact from "../core/peact";
import Columns from "./Column/Columns";
import styles from "./main.module.css";

const Main = ({ columns, todos }) => {
  return peact.createElement({
    tag: "div",
    child: [Columns({ columns, todos })],
  });
};

export default Main;
