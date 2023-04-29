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

      //set answers array place holders.
      const answerArraySize = answers.length;
      const metadataArraySize =
        response.data.data.attributes.metadata.attributes.length;
      if (answerArraySize < metadataArraySize) {
        for (let i = answerArraySize; i < metadataArraySize; i++) {
          answers.push(0);
        }
      }
    } catch (error) {
      console.log("Could not fetch the Model Metadata", error);
    }
  };

  const queryModel = async () => {
    // const mockAnswers = [ // for testinng purposes, Decision: Milkshake
    //   10.0,
    //   "Male",
    //   25.0,
    //   "Yes",
    //   "Evening",
    //   "NA",
    //   "Yes",
    //   9.0,
    //   2.0,
    // ];
    // console.log("Mock Answers", mockAnswers);

    try {
      const response = await axios.post(
        `https://api.up2tom.com/v3/decision/${modelId}`,
        {
          data: {
            type: "scenario",
            attributes: {
              input: answers,
            },
          },
        },
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      setDecision(response.data.data.attributes.decision);
    } catch (error) {
      console.log("Error querying the model: ", error);
    }
  };

  // Fetch model from an API when the component mounts, then load metadata queations
  useEffect(() => {
    fetchModelMetadata();
  }, []);

  const updateAnswer = (index, newAnswer) => {
    //updates answer for a question at index
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = newAnswer;
      return updatedAnswers;
    });
    console.log("Current Answers", answers);
  };

  return (
    <div>
      <h1>Drink Choice</h1>
      <InputWrapper inputs={inputVariables} updateAnswer={updateAnswer} />
      <SubmitButton queryModel={queryModel} />
      <DecisionBox decision={decision} />
    </div>
  );
}

export default MainForm;
