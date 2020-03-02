import React from "react";
import CounterDaily from "./CounterDaily";
import CounterWeekly from "./CounterWeekly";
import CounterMonthly from "./CounterMonthly";

export default function CounterComp() {
  return (
    <span>
      <CounterDaily />
      <CounterWeekly />
      <CounterMonthly />
    </span>
  );
}
