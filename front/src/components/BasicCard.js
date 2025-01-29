import React, { forwardRef } from "react";

const BasicCard = forwardRef(({ title, children, backgroundColor = "#C3E3B6" }, ref) => {
    return (
        <div
            ref={ref} // Ajout de la référence ici
            style={{
                width: "90%",
                minHeight: "200px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                backgroundColor: backgroundColor,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                position: "relative",
                margin: "10px auto",
                alignItems: "flex-start",
            }}
        >
            <h1 style={{ position: "absolute", top: "10px", left: "15px", margin: 0 }}>
                {title}
            </h1>

            <div style={{ marginTop: "40px", width: "100%" }}>
                {children}
            </div>
        </div>
    );
});

export default BasicCard;
