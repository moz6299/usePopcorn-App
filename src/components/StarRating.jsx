import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const StarRating = ({
  maxRating = 5,
  color = "yellow",
  size = 48,
  className = "",
  messages = [],
  setMovieRated,
  defaultRating = 0,
  
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  const handleRating = (i) => {
    setRating(i + 1);
    setMovieRated(i + 1);
  };

  const handleHoverIn = (i) => {
    setTempRating(i + 1);
  };

  const handleHoverOut = (i) => {
    setTempRating(0);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onRate={() => handleRating(i)}
              onHoverIn={() => handleHoverIn(i)}
              onHoverOut={() => handleHoverOut(i)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
