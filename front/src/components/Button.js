import React, { forwardRef } from "react";

const Button = forwardRef(({ text, onClick, customClass, style }, ref) => {
  return (
    <button ref={ref} className={customClass || "default-button"} onClick={onClick} style={style}>
      {text}
    </button>
  );
});

export default Button;
