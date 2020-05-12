import React, { useState, useEffect } from "react";

export default function CounterMonthly() {
  const [counterMonthly, setCounterMonthly] = useState({
    counter: "0"
  });

  return (
    <div>
      <div>daily hours: {counterMonthly.counter}</div>
    </div>
  );
}
