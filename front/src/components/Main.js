import Column from "./Column/Column";
import styles from "./main.module.css";

const Main = () => {
  return `
        <div class="${styles.content}">
            ${Column()}
        </div>
    `;
};

export default Main;
