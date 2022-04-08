import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Main from "./components/Main";

const App = () => {
  return `
    <div class="${styles.wrap}">
        <div class="${styles.todolistArea}">
            ${Header()}
            ${Main()}
        </div>
        <div class="log-area active"></div>
    </div>
  `;
};

export default App;
