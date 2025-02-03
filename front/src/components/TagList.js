import React from "react";

const TagList = ({ tags, onTagClick }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {tags.map((tag) => (
        <span
          key={tag}
          onClick={() => onTagClick(tag)}
          style={{
            backgroundColor: "white",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;