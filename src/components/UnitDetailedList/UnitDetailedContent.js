import React, { useState } from "react";

export default function UnitDetailedContent(props) {
  const [content, setDescription] = useState({
    set: props.content
  });

  return (
    <div>
      <p> {content.set} </p>
    </div>
  );
}
