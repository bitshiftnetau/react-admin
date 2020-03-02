import React, { useState } from "react";

export default function UnitNumber(props) {
  const [unitNum, setUnitNum] = useState({
    num: props.number
  });

  return (
    <div>
      <h5>Unit Code: {unitNum.num}</h5>
    </div>
  );
}
