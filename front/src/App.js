import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import peact from "./core/peact";

const App = () => {
  const [actionDisplay, setActionDisplay] = peact.useState("none");

  const handleActionDisplay = () => {
    const display = actionDisplay === "none" ? "visible" : "none";
    setActionDisplay(display);
  };

  return `
    <div class="${styles.wrap}">
        <div class="${styles.todolistArea}">
            ${Header({ onMenuClick: handleActionDisplay })}
            ${Main()}
        </div>
        ${Actions({ display: actionDisplay })}
    </div>
  `;
};

export default App;
