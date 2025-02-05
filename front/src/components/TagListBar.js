import React from "react";

const TagListBar = ({ searchQuery, setSearchQuery, selectedFilters, handleRemoveFilter }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "white",
        marginBottom: "10px",
      }}
    >
      {selectedFilters.map((filter) => (
        <span
          key={filter}
          onClick={() => handleRemoveFilter(filter)}
          style={{
            backgroundColor: "#8bc34a",
            padding: "5px 10px",
            margin: "2px",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
          }}
        >
          {filter}
          <span style={{ marginLeft: "5px", fontSize: "0.8rem" }}>×</span>
        </span>
      ))}
      <input
        type="text"
        placeholder={selectedFilters.length > 0 ? "" : "Recherche"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          flex: 1,
          padding: "5px",
          border: "none",
          outline: "none",
          minWidth: "100px",
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default TagListBar;
