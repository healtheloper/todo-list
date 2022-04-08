import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import styles from "./column.module.css";

const Column = () => {
  return `
    <div class="${styles.column}">
        ${Header()}
        ${Cards()}
    </div>
    `;
};

export default Column;
