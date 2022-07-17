import React, { useState } from "react";
import { AppState } from "../../AppContext";
const { Configuration, OpenAIApi } = require("openai");

export const CreatePage = () => {
  const [aiInput, setAiInput] = useState("");
  const [generatedAiContent, setGeneratedAiContent] = useState([]);
  const { setLoading, notify } = AppState();

  const generateAiContent = async () => {
    const inputText = aiInput;

    if (!inputText) {
      notify("Input text cannot be blank");
      return;
    }

    if (inputText.split(" ").length <= 5) {
      notify("Input string should contain atleast five words");
      return;
    }

    setLoading(true);

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_AI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: inputText,
      max_tokens: 40,
      temperature: 0.9,
      n: 5,
      echo: true,
    });
    const content = response.data.choices;
    setGeneratedAiContent(content);
    console.log("Content: ", response.data.choices);
    setLoading(false);
  };

  return (
    <div class="writerai-create-page">
      <div className="writerai-header">
        <div className="writerai-header__input-name">
          <input
            type="text"
            className="writerai-header__document-name"
            placeholder="Document Title"
          />
        </div>
        <div className="writerai-header__buttons">
          <button className="writerai-button writerai-header__button--secondary">
            Preview
          </button>
          <button className="writerai-button writerai-header__button--primary">
            Save
          </button>
        </div>
      </div>
      <div className="writerai-document">
        <div className="writerai-writer">
          <textarea
            className="writerai-writer__input"
            placeholder="Write your content here"
          />
        </div>
        <div className="writerai-generate">
          <textarea
            className="writerai-generate__input"
            placeholder="Write something to generate content using AI"
            onChange={(e) => setAiInput(e.target.value)}
          />
          <button
            onClick={() => generateAiContent()}
            className="writerai-button writerai-generate__button"
          >
            Generate
          </button>
          <div className="writerai-ai-results">
            {generatedAiContent.map((item) => (
              <div style={{ marginTop: 20 }}>{item.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
