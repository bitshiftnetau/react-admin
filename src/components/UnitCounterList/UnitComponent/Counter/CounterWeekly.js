import React, { useState, useEffect } from "react";

export default function CounterWeekly() {
  const [counterWeekly, setCounterWeekly] = useState({
    counter: "0"
  });

  return (
    <div>
      <p>weekly hours: {counterWeekly.counter}</p>
    </div>
  );
}
