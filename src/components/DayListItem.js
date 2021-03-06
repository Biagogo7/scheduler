import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  const propsspots = props.spots;
  // alert(props.selected)

  const formatSpots = function(propsspots) {
    if (propsspots === 0) {
      return 'no spots remaining';
    }

    if (propsspots === 1) {
      return '1 spot remaining';
    }

    if (propsspots >= 2) {
      return `${propsspots} spots remaining`;
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid='day'>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots(propsspots)} </h3>
    </li>
  );
}