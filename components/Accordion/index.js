import classNames from "classnames";
import React, { useState } from "react";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Accordion({ className, items, ...props }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const alignmentsClass = alignments({ props });

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={classNames(
        "component component__accordion",
        className,
        alignmentsClass
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={classNames("component__accordion__item", {
            "component__accordion__item--active": activeIndex === index,
          })}
        >
          <h3 onClick={() => toggleItem(index)}>
            {item.title} {item.emoji && <i>{item.emoji}</i>}
          </h3>
          <div className="component__accordion__content">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
