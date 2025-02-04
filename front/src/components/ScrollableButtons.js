import React from "react";
import ButtonGroup from "./ButtonGroup";

const ScrollableButtons = ({ labels, cardRefs }) => {
  const scrollToCard = (label) => {
    const navbarHeight = 120; // Hauteur de la navbar en pixels

    if (label === "Restauration") {
      if (cardRefs["Activité"]?.current) {
        // Calculer la position de la section "Activité" en tenant compte de la navbar
        const activitePosition = cardRefs["Activité"].current.getBoundingClientRect().top;
        const activiteOffset = activitePosition + window.pageYOffset - navbarHeight;

        // Faire défiler jusqu'à "Activité"
        window.scrollTo({
          top: activiteOffset,
          behavior: "smooth",
        });

        // Après un délai, faire défiler jusqu'à "Restauration"
        setTimeout(() => {
          if (cardRefs["Restauration"]?.current) {
            const restaurationPosition = cardRefs["Restauration"].current.getBoundingClientRect().top;
            const restaurationOffset = restaurationPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: restaurationOffset,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    } else {
      const ref = cardRefs[label];
      if (ref?.current) {
        // Calculer la position de la section cible en tenant compte de la navbar
        const position = ref.current.getBoundingClientRect().top;
        const offset = position + window.pageYOffset - navbarHeight;

        // Faire défiler jusqu'à la section cible
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      } else {
        console.warn(`Référence introuvable pour : ${label}`);
      }
    }
  };

  return <ButtonGroup labels={labels} onButtonClick={scrollToCard} />;
};

export default ScrollableButtons;