import React, { useState, useEffect } from "react";

export default function CounterMonthly() {
  const [counterMonthly, setCounterMonthly] = useState({
    counter: "0"
  });

  return (
    <div>
      <p>daily hours: {counterMonthly.counter}</p>
    </div>
  );
}
