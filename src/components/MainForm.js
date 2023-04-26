import React, { useState, useEffect } from "react";
import axios from "axios";

function MainForm() {
  const [model, setModel] = useState({}); //full model for Drink Choice
  const [modelName, setModelName] = useState(""); //modelName: DrinkChoice
  const [metadata, setMetadata] = useState({}); //contains attributes and predition
  const [inputVariables, setInputVariables] = useState([]); //questions
  const [count, setCount] = useState(0); // to be removed
  const [answers, setAnswers] = useState([]);
  const [decision, setDecision] = useState(null);

  const apiKey = "9307bfd5fa011428ff198bb37547f979";
  const modelId = "58d3bcf97c6b1644db73ad12";

  function submitHandler() {
    setCount((prevCount) => prevCount + 1);
    console.log(count);

    const mockData = {
      data: {
        type: "Drink choice",
        attributes: {
          input: [10, "Male", 20, "Yes", "Morning", "No", "Yes", 1, 2],
        },
      },
    };

    const mockD = JSON.stringify(mockData);

    axios
      .post(
        `https://api.up2tom.com/v3/decision/${modelId}`,
        { mockD },
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .then((res) => {
        console.log("Response", res);
      })
      .catch((error) => {
        console.log("Error querying the model: ", error);
      });
  }

  useEffect(() => {
    axios
      .get(`https://api.up2tom.com/v3/models/${modelId}`, {
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/vnd.api+json",
        },
      })
      .then((res) => {
        setModel(res.data.data);
        setModelName(model.attributes.name);
        setMetadata(model.attributes.metadata);
        setInputVariables(model.attributes.metadata.attributes);
        console.log("Request", model);
      })
      .catch((error) => {
        console.log("Could not fetch the model", error);
      });
  }, [count]);

  return (
    <div>
      <h1>{modelName}</h1>
      <form>
        <ul>
          {inputVariables.map((inputVar) => (
            <li key={inputVar.name}>
              <label for={inputVar.name}>{inputVar.question} </label>
              <input
                id={inputVar.name}
                type="text"
                placeholder={inputVar.domain.values}
              ></input>
            </li>
          ))}
        </ul>

        <button type="button" onClick={submitHandler}>
          Submit Data
        </button>
      </form>
    </div>
  );
}

export default MainForm;
