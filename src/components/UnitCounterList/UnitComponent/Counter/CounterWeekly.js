import React, { useState, useEffect } from "react";

export default function CounterWeekly() {
  const [counterWeekly, setCounterWeekly] = useState({
    counter: "0"
  });

  return (
    <div>
      <div>weekly hours: {counterWeekly.counter}</div>
    </div>
  );
}
