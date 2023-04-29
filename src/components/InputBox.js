import React from "react";

function InputBox(props) {
  return (
    <div>
      <input
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        onChange={(event) => {
          event.preventDefault();
          const inputBoxId = props.id;
          const index = parseInt(inputBoxId.charAt(inputBoxId.length - 1)) - 1; // use to store the answer in Answers state
          props.updateAnswer(index, event.target.value); //call back function defined in main form
        }}
      ></input>
    </div>
  );
}

export default InputBox;
