import React from "react";
import Label from "./Label";
import InputBox from "./InputBox";

function InputWrapper(props) {
  return (
    <div>
      <ul className="list-none">
        {props.inputs.map((inputVar) => (
          <li key={inputVar.name} className="flex items-center">
            <Label boxId={inputVar.name} question={inputVar.question} />
            <InputBox
              id={inputVar.name}
              placeholder={inputVar.domain.values}
              updateAnswer={props.updateAnswer}
              className="flex-grow"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputWrapper;
