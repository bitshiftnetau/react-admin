import React from "react";
import AssignmentDue from "./AssignmentDue";
import FinalExam from "./FinalExam";

export default function DueDateComp() {
  return (
    <span>
      <h6>Dates: </h6>
      <AssignmentDue />
      <FinalExam />
    </span>
  );
}
