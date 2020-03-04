import React from "react";
import WellnessScaleComp from "../WellnessScale/WellnessScaleComp";

export default function WellbeingSection(props) {
  return (
    <div style={props.style} className="section-class">
      <WellnessScaleComp />
    </div>
  );
}
