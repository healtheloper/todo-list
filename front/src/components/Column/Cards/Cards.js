import Card from "../Card/Card";
import CardWritable from "../CardWritable/CardWritable";
import styles from "./cards.module.css";

const Cards = ({ column, todos }) => {
  return `
  <div class="${styles.cardsArea}">
    ${CardWritable()}
    ${Card({ column, todos })}
  </div>
    `;
};

export default Cards;
