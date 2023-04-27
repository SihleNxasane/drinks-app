import React, { useState, useEffect } from "react";
import axios from "axios";
import InputWrapper from "./InputWrapper";
import SubmitButton from "./SubmitButton";
import DecisionBox from "./DecisionBox";

function MainForm() {
  const [model, setModel] = useState({}); //full model for Drink Choice
  const [inputVariables, setInputVariables] = useState([]); //questions
  const [answers, setAnswers] = useState([]);
  const [decision, setDecision] = useState("");

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
      setInputVariables(response.data.data.attributes.metadata.attributes);
      console.log(
        "fetched Model Metadata",
        response.data.data.attributes.metadata
      );
    } catch (error) {
      console.log("Could not fetch the Model Metadata", error);
    }
  };

  const queryModel = async () => {
    const mockData = {
      data: {
        type: "scenario",
        attributes: {
          input: [
            10.0,
            "Male",
            25.0,
            "Yes",
            "Afternoon",
            "NA",
            "Yes",
            9.0,
            2.0,
          ],
        },
      },
    };

    console.log("Mock Data", mockData);

    try {
      const response = await axios.post(
        `https://api.up2tom.com/v3/decision/${modelId}`,
        mockData,
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      setDecision(response.data.data.attributes.decision);
      console.log("Decision", response.data.data);
    } catch (error) {
      console.log("Error querying the model: ", error);
    }
  };

  useEffect(() => {
    fetchModelMetadata();
    queryModel();
  }, []);

  function submitHandler() {
    fetchModelMetadata();
    queryModel();
  }

  return (
    <div>
      <h1>Drink Choice</h1>
      <InputWrapper inputs={inputVariables} />
      <SubmitButton />
      <DecisionBox decision={decision} />
    </div>
  );
}

export default MainForm;
