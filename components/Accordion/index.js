import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Accordion({ className, items, ...props }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const alignmentsClass = alignments({ props });
  const accordionRefs = useRef([]);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null && accordionRefs.current[activeIndex]) {
      accordionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeIndex]);

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
          ref={(el) => (accordionRefs.current[index] = el)}
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
