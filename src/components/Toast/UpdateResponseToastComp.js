import React, { useState } from 'react'
import { Toast, Button } from 'react-bootstrap'

export default function ReponseToast(props) {

  const toast_style = {
    position: 'absolute',
    top: 0,
    right: 0,
  }

    return (
    <div>
        <Toast style={toast_style} onClose={props.close} show={props.show} delay={3000}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>        
    </div>
    );
  }