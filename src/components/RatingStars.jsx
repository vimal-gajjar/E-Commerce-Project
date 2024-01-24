import React, { useState } from "react";
import Star from "./Star";
import "../style/RatingStar.css";

const RatingStars = () => {
  const [gradeIndex, setGradeIndex] = useState();
  const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
  const activeStar = {
    fill: "yellow",
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  return (
    <div className="mb-2">
      <p className="result m-0">
        {GRADES[gradeIndex] ? GRADES[gradeIndex] : "You didn't review yet"}
      </p>
      <div className="stars">
        {GRADES.map((grade, index) => (
          <Star
            index={index}
            key={grade}
            changeGradeIndex={changeGradeIndex}
            style={gradeIndex >= index ? activeStar : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
