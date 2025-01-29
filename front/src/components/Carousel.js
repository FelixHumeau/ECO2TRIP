import React, { useState } from "react";

const Carousel = ({ images, height = "700px", width = "90%" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Carousel principal */}
      <div
        style={{
          marginTop: "20px",
          position: "relative",
          display: "inline-block",
          width,
          height,
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Rend l'image non déformée et coupe les bords si nécessaire
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        {/* Flèche gauche */}
        <button
          onClick={goToPrevious}
          style={{
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "55px", // Augmente légèrement pour éviter le débordement
            height: "55px",
            display: "flex", // Activation du centrage
            alignItems: "center", // Centre verticalement
            justifyContent: "center", // Centre horizontalement
            fontSize: "30px", // Taille de la flèche plus grande
            lineHeight: "1", // Évite tout décalage vertical
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "translateY(-50%) scale(1.3)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "translateY(-50%)")
          }
        >
          &#8249;
        </button>

        {/* Flèche droite */}
        <button
          onClick={goToNext}
          style={{
            position: "absolute",
            top: "50%",
            right: "15px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            lineHeight: "1",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "translateY(-50%) scale(1.3)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "translateY(-50%)")
          }
        >
          &#8250;
        </button>

      </div>

      {/* Miniatures */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniature ${index + 1}`}
            onClick={() => selectImage(index)}
            style={{
              width: "100px",
              height: "75px",
              objectFit: "cover",
              margin: "0 5px",
              border: currentIndex === index ? "2px solid blue" : "1px solid gray",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "transform 0.2s",
              transform: currentIndex === index ? "scale(1.1)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
