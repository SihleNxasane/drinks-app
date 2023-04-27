import React from "react";

function InputBox(props) {
  return (
    <div>
      <input id={props.id} type="text" placeholder={props.placeholder}></input>
    </div>
  );
}

export default InputBox;
