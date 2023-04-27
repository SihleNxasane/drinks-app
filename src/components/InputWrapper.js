import React from "react";
import Label from "./Label";
import InputBox from "./InputBox";

function InputWrapper(props) {
  return (
    <div>
      <ul>
        {props.inputs.map((inputVar) => (
          <li key={inputVar.name}>
            <Label boxId={inputVar.name} question={inputVar.question} />
            <InputBox id={inputVar.name} placeholder={inputVar.domain.values} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputWrapper;
