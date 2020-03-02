import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Row>
          <Col>
            <Form.Control
              placeholder="Unit #"
              onChange={e => setNum(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Unit title"
              onChange={e => setName(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Unit Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={e => setContent(e.target.value)}
            />
          </Col>
        </Row>

        <Button className="detailed-list-add-item" onClick={handleSubmit}>
          Add
        </Button>
      </Form.Group>
    </Form>
  );
}
