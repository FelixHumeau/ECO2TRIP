import React from "react";
import PropTypes from "prop-types";
import styles from "../style/BoxInfo.module.css";

const BoxInfo = ({ texts }) => {
  if (!texts || texts.length < 3) {
    return <p className={styles.errorMessage}>Erreur : données insuffisantes.</p>;
  }

  return (
    <div className={styles.box}>
      <div className={styles.text} aria-label="Première information">{texts[0]}</div>
      <div className={styles.textCenter} aria-label="Deuxième information">{texts[1]}</div>
      <div className={styles.text} aria-label="Troisième information">{texts[2]}</div>
    </div>
  );
};

BoxInfo.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BoxInfo.defaultProps = {
  texts: ["Texte 1", "Texte 2", "Texte 3"],
};

export default BoxInfo;
