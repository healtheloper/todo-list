import styles from "./app.module.css";

const t = document.querySelector(".title");
t.addEventListener("click", () => {
  console.log("test");

  const div = document.createElement("div");
  div.classList.add(styles.test);
  div.innerHTML = "테스트";
  t.appendChild(div);
});
