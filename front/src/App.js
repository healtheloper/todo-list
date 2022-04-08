import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import Header from "./components/Header/Header";
import Main from "./components/Main";

const App = () => {
  return `
    <div class="${styles.wrap}">
        <div class="${styles.todolistArea}">
            ${Header()}
            ${Main()}
        </div>
        ${Actions()}
    </div>
  `;
};

export default App;
