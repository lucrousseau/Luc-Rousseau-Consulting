import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { alignments } from "../../commons/alignments";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {{ title?: string; content?: import('react').ReactNode; logo?: string | import('next/image').StaticImageData; emoji?: string }[]} props.items
 * @param {(state: { open: boolean }) => void} [props.callback]
 * @param {number | null} [props.activeIndex]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
export default function Accordion({ className, items, callback = () => {}, ...props }) {
  const [activeIndex, setActiveIndex] = useState(
    /** @type {number | null} */ (props.activeIndex ?? null)
  );
  const alignmentsClass = alignments({ props });
  const accordionRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const accordionRefs = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));

  /** @param {number} index */
  const toggleItem = (index) => {
    const getActiveIndex = activeIndex === index ? null : index;
    const open = getActiveIndex !== null;

    setActiveIndex(getActiveIndex);
    callback({ open });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    // safe: activeIndex is component state (number), accordionRefs is our ref array
    // eslint-disable-next-line security/detect-object-injection
    const el = accordionRefs.current[activeIndex];
    if (!el) return;

    // Defer until after expand layout so scrollIntoView does not force sync reflow.
    let active = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!active) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    return () => {
      active = false;
    };
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
          <h3>
            <button
              type="button"
              className="component__accordion__trigger"
              aria-expanded={activeIndex === index}
              onClick={() => toggleItem(index)}
            >
              {item.title}{" "}
              <i
                className={classNames("component__accordion__icon", {
                  "component__accordion__icon--logo": Boolean(item.logo),
                  "component__accordion__icon--emoji": Boolean(item.emoji) && !item.logo,
                  "component__accordion__icon--toggle-only": !item.logo && !item.emoji,
                })}
              >
                {item.logo ? (
                  <span className="component__accordion__logo">
                    <Image
                      src={item.logo}
                      alt={item.title ? `${item.title} logo` : ""}
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  </span>
                ) : (
                  item.emoji || null
                )}
                <em aria-hidden="true">
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
            </button>
          </h3>
          <div className="component__accordion__content">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
