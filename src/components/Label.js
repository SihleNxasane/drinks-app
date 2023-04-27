import React from "react";

function Label(props) {
  return (
    <div>
      <label for={props.boxId}>{props.question}</label>
    </div>
  );
}

export default Label;
