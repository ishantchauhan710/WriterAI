import React, { useState } from "react";
import { AppState } from "../../AppContext";
import AddMarkdownFabMenu from "./components/AddMarkdownFabMenu";
import ShowPreview from "./components/ShowPreview";
const { Configuration, OpenAIApi } = require("openai");

export const CreatePage = () => {
  const [aiInput, setAiInput] = useState("");
  const [generatedAiContent, setGeneratedAiContent] = useState([]);
  const { setLoading, notify } = AppState();

  const [openMarkdownPanel,setOpenMarkdownPanel] = useState(false);
  const [showPreview,setShowPreview] = useState(false);


  const [loadingAiContent, setLoadingAiContent] = useState(false);

  const [content,setContent] = useState('');

  const generateAiContent = async () => {
    // setGeneratedAiContent([
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et pharetra.",
    //   "Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Id aliquet risus feugiat in ante metus. Eget nunc lobortis mattis aliquam faucibus purus in massa tempor.",
    //   "Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Duis at tellus at urna condimentum mattis pellentesque id nibh.",
    //   "Nunc lobortis mattis aliquam faucibus purus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Suspendisse potenti nullam ac tortor vitae.",
    //   "Elementum nibh tellus molestie nunc. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. A arcu cursus vitae congue mauris rhoncus aenean vel elit.",
    // ]);

    if (loadingAiContent) {
      return;
    }

    const inputText = aiInput;

    if (!inputText) {
      notify("Input text cannot be blank");
      return;
    }

    if (inputText.split(" ").length <= 5) {
      notify("Input string should contain atleast five words");
      return;
    }

    setLoadingAiContent(true);

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
    setLoadingAiContent(false);
  };

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify("Text copied to cliboard", "success");
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
          <button onClick={() => setShowPreview(true)} className="writerai-button writerai-header__button--secondary">
            Preview
          </button>
          <button className="writerai-button writerai-header__button--primary">
            Save
          </button>
          <ShowPreview open={showPreview} setOpen={setShowPreview} content={content} />
        </div>
      </div>
      <div className="writerai-document">
        <div className="writerai-writer">
          <textarea
            className="writerai-writer__input"
            placeholder="Write your content here"
            spellCheck="false"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <AddMarkdownFabMenu open={openMarkdownPanel} setOpen={setOpenMarkdownPanel} content={content} setContent={setContent} />
          <div onClick={() => setOpenMarkdownPanel(true)} className="writerai-header__fab">+</div>
        </div>
        <div className="writerai-generate">
          <div className="writerai-generate__container">
            <textarea
              className="writerai-generate__input"
              placeholder="Write something to generate content using AI"
              onChange={(e) => setAiInput(e.target.value)}
              spellCheck="false"
            />
            <button
              onClick={() => generateAiContent()}
              className="writerai-button writerai-generate__button"
            >
              {loadingAiContent === true ? (
                <>
                  <i class="fa fa-circle-o-notch fa-spin"></i>Generating...
                </>
              ) : (
                <>Generate</>
              )}
            </button>
          </div>
          <div className="writerai-ai-results">
            {generatedAiContent.map((item) => (
              <div className="writerai-ai-result">
                <div className="writerai-ai-result__content">{item.text}</div>
                <div className="writerai-ai-result__buttons">
                  <button
                    onClick={() => copyTextToClipboard(item.text)}
                    className="writerai-button writerai-ai-result__button--primary"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
