import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { alignments } from "../../commons/alignments";

export default function Accordion({ className, items, callback = () => {}, ...props }) {
  const [activeIndex, setActiveIndex] = useState(null || props.activeIndex);
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
    // safe: activeIndex is component state (number), accordionRefs is our ref array
    // eslint-disable-next-line security/detect-object-injection
    if (activeIndex !== null && accordionRefs.current[activeIndex]) {
      // eslint-disable-next-line security/detect-object-injection
      accordionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeIndex]);

  return (
    <div
      className={classNames("component component__accordion", className, alignmentsClass)}
      ref={accordionRef}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            // safe: index from items.map
            // eslint-disable-next-line security/detect-object-injection
            accordionRefs.current[index] = el;
          }}
          className={classNames("component__accordion__item", {
            "component__accordion__item--active": activeIndex === index,
          })}
        >
          <h3 onClick={() => toggleItem(index)}>
            {item.title}{" "}
            {(item.logo || item.emoji) && (
              <i>
                {item.logo ? (
                  <span className="component__accordion__logo">
                    <Image src={item.logo} alt="" width={40} height={40} />
                  </span>
                ) : (
                  item.emoji
                )}
                <em>
                  {activeIndex !== index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        fill="currentColor"
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
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
