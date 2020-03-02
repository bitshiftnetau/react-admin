import React, { useState } from "react";

export default function AddUnitComp({ addUnit }) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!num) return;
    addUnit(num, name, content);
    setNum("");
    setName("");
    setContent("");
  };

  return (
    <form>
      <input
        type="text"
        className="input"
        value={num}
        placeholder="Unit #"
        onChange={e => setNum(e.target.value)}
      />
      <input
        type="text"
        className="input"
        value={name}
        placeholder="Unit title"
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        className="input"
        value={content}
        placeholder="Unit Content"
        onChange={e => setContent(e.target.value)}
      />
      <button className="detailed-list-add-item" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}
