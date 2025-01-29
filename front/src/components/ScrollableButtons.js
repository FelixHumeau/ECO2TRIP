import React from "react";
import ButtonGroup from "./ButtonGroup";

const ScrollableButtons = ({ labels, cardRefs }) => {
  const scrollToCard = (label) => {
    if (label === "Restauration") {
      if (cardRefs["Activité"]?.current) {
        cardRefs["Activité"].current.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          if (cardRefs["Restauration"]?.current) {
            cardRefs["Restauration"].current.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 500);
      }
    } else {
      const ref = cardRefs[label];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`Référence introuvable pour : ${label}`);
      }
    }
  };

  return <ButtonGroup labels={labels} onButtonClick={scrollToCard} />;
};

export default ScrollableButtons;
