import React from "react";

function Label(props) {
  return (
    <div>
      <label htmlFor={props.boxId}>{props.question}</label>
    </div>
  );
}

export default Label;
