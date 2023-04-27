import React, { useState, useEffect } from "react";
import axios from "axios";

function MainForm() {
  const [model, setModel] = useState({}); //full model for Drink Choice
  const [modelName, setModelName] = useState(""); //modelName: DrinkChoice
  const [metadata, setMetadata] = useState({}); //contains attributes and predition
  const [inputVariables, setInputVariables] = useState([]); //questions
  const apiKey = "9307bfd5fa011428ff198bb37547f979";
  const modelId = "58d3bcf97c6b1644db73ad12";

  const fetchModelMetadata = async () => {
    try {
      const response = await axios.get(
        `https://api.up2tom.com/v3/models/${modelId}`,
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      setModel(response.data.data);
      setModelName(model.attributes.name);
      setMetadata(model.attributes.metadata);
      setInputVariables(model.attributes.metadata.attributes);
      console.log("fetched Model Metadata", metadata);
    } catch (error) {
      console.log("Could not fetch the Model Metadata", error);
    }
  };

  const queryModel = async () => {
    const mockData = {
      data: {
        type: "Drink choice",
        attributes: {
          input: [10.0, "Male", 20.0, "Yes", "Morning", "No", "Yes", 1.0, 2.0],
        },
      },
    };
    console.log("Mock Data", mockData);

    try {
      const response = await axios.post(
        `https://api.up2tom.com/v3/decision/${modelId}`,
        { mockData },
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      console.log("Response", response.data);
    } catch (error) {
      console.log("Error querying the model: ", error);
    }
  };

  // const [count, setCount] = useState(0); // to be removed
  // useEffect(() => {
  //   fetchModelMetadata();
  //   queryModel();
  // }, []);

  function submitHandler() {
  // setCount(prevCount => prevCount + 1);
    fetchModelMetadata();
    queryModel();
  }

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

// const mockData2 = {
//   data: {
//     type: "Drink choice",
//     attributes: {
//       input: {
//         INPUTVAR1: 10.0,
//         INPUTVAR2: "Male",
//         INPUTVAR3: 20.0,
//         INPUTVAR4: "Yes",
//         INPUTVAR5: "Morning",
//         INPUTVAR6: "No",
//         INPUTVAR7: "Yes",
//         INPUTVAR8: 1.0,
//         INPUTVAR9: 2.0,
//       },
//     },
//   },
// };
