import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Accordion({
  className,
  items,
  callback = () => {},
  ...props
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const alignmentsClass = alignments({ props });
  const accordionRef = useRef();
  const accordionRefs = useRef([]);

  const toggleItem = (index) => {
    const getActiveIndex = activeIndex === index ? null : index;
    const open = getActiveIndex !== null;

    setActiveIndex(getActiveIndex);
    callback({ open });
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
      ref={accordionRef}
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
            {item.title}{" "}
            {item.emoji && (
              <i>
                {item.emoji}
                <em>
                  {activeIndex !== index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                      />
                    </svg>
                  )}
                </em>
              </i>
            )}
          </h3>
          <div className="component__accordion__content">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
