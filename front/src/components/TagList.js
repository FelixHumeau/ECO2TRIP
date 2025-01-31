import React from "react";
import { useNavigate } from "react-router-dom";

const Tag = ({ text }) => {
  const navigate = useNavigate();

  return (
    <button className="tag" onClick={() => navigate('/questionnaire')}>
      {text}
    </button>
  );
};

const TagList = ({ tags }) => {
  return (
    <div className="tag-list">
      {tags.map((tag, index) => (
        <Tag key={index} text={tag} />
      ))}
    </div>
  );
};

export default TagList;