import React, { useState } from "react";

export default function UnitNumber(props) {
  const [num, setUnitNum] = useState({
    set: props.num
  });

  return (
    <div>
      <p>{num.set}</p>
    </div>
  );
}
