import React from "react";

function SubmitButton(props) {
  return (
    <div>
      <button type="button" onClick={props.queryModel}>Submit Answers</button>
    </div>
  );
}

export default SubmitButton;
