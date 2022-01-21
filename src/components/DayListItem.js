import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining';
    }

    if (props.spots === 1) {
      return '1 spot remaining';
    }

    if (props.spots === 2) {
      return '2 spots remaining';
    }
  };

  const dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots()} </h3>
    </li>
  );
}