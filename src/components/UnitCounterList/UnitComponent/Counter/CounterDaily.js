import React, { useState, useEffect } from "react";

export default function CounterDaily() {
  const [counterDaily, setCounterDaily] = useState({
    counter: "0"
  });

  return (
    <div>
      <div>daily hours: {counterDaily.counter}</div>
    </div>
  );
}
