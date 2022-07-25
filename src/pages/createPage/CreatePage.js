import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../AppContext";
import YesNoDialog from "../../components/YesNoDialog";
import OptionsFab from "./components/OptionsFab";
import ShowPreview from "./components/ShowPreview";
import axios from "axios";
import { BASE_URL } from "../../other/Constants";
const { Configuration, OpenAIApi } = require("openai");

export const CreatePage = () => {
  const [aiInput, setAiInput] = useState("");
  const [generatedAiContent, setGeneratedAiContent] = useState([]);
  const { setLoading, notify, projectName, setProjectName } = AppState();

  const [openMarkdownPanel, setOpenMarkdownPanel] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [loadingAiContent, setLoadingAiContent] = useState(false);

  const [content, setContent] = useState("");

  const [splitGenerator, setSplitGenerator] = useState(false);
  const [splitWriter, setSplitWriter] = useState(true);

  const [showBackDialog, setShowBackDialog] = useState(false);

  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userInfo"));
    //console.log("Token in storage: ", userToken);

    if (userToken) {
      setToken(userToken);
      //console.log("Token: ", token) [WILL GIVE NULL DUE TO SYNC EXECUTION];
    }
  }, []);

  // 1 -> Show Writer, 2 -> Show Generator
  const handleSplitScreen = (splitCode) => {
    if (splitCode === 1) {
      setSplitGenerator(false);
      setSplitWriter(true);
    } else {
      setSplitGenerator(true);
      setSplitWriter(false);
    }
  };

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
      notify("Input text cannot be empty");
      return;
    }

    if (inputText.split(" ").length < 5) {
      notify("Input text should contain atleast five words");
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

  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(projectName);
  }, []);

  const saveProject = async () => {
    //console.log("Token: ", token);

    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!projectName) {
      setProjectName("Untitled");
    }

    if (!title) {
      notify("Project title cannot be blank", "error");
      return;
    } else if (!content) {
      notify("Project content cannot be blank", "error");
      return;
    } else {
      const result = await axios.post(
        `${BASE_URL}/project/insert`,
        {
          title: projectName,
          description: title,
          content: content,
          coverImage: "",
          timeStamp: new Date().getTime(),
        },
        config
      );

      setLoading(false);
      if (result.data.status === 200) {
        notify("Project saved successfully", "success");
        navigate("/home");
      } else {
        notify("An unknown error occurred", "error");
      }
    }
  };

  return (
    <div className="create-page">
      <ShowPreview
        open={showPreview}
        setOpen={setShowPreview}
        content={content}
      />
      <YesNoDialog
        open={showBackDialog}
        setOpen={setShowBackDialog}
        title="Go Back"
        message="Are you sure you want to go back? All your data will be lost"
        yesAction={() => navigate("/home")}
      />
      <div className="create-page__header">
        <div
          onClick={() => setShowBackDialog(true)}
          className="create-page__header__back-button-container"
        >
          <i className="material-icons">arrow_back</i>
        </div>
        <div className="create-page__header__title">
          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
          />
        </div>
        <div className="create-page__header__action-button-container">
          <button
            onClick={() => setShowPreview(true)}
            className="create-page__header__action-button--secondary writerai-button create-page__header__action-button-preview"
          >
            Preview
          </button>
          <button
            onClick={() => saveProject()}
            className="create-page__header__action-button--primary writerai-button"
          >
            Save
          </button>
        </div>
      </div>

      <div className="create-page__body">
        <div
          className={`create-page__body__editor ${
            splitWriter === true
              ? "show-responsive-vertical"
              : "hide-responsive-vertical"
          }`}
        >
          <div className="create-page__body__editor__scrollable-body">
            <div
              spellCheck="false"
              className="create-page__body__editor__title"
              contentEditable="plaintext-only"
              placeholder="Project Title"
              onBlur={(e) => setTitle(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
            >
              {title}
            </div>
            <div
              spellCheck="false"
              className="create-page__body__editor__content"
              contentEditable="plaintext-only"
              placeholder="Write your content here..."
              onBlur={(e) => setContent(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
            >
              {content}
            </div>
          </div>
          <OptionsFab
            content={content}
            setContent={setContent}
            handleSplitScreen={handleSplitScreen}
          />
        </div>

        <div
          className={`create-page__body__generator ${
            splitGenerator === true ? "show-responsive" : "hide-responsive"
          }`}
        >
          <div className="create-page__body__generator__field">
            <textarea
              spellCheck={false}
              placeholder="Write something to make the AI work"
              onChange={(e) => setAiInput(e.target.value)}
            />
            <div className="create-page__body__generator__buttons">
              <button
                onClick={() => handleSplitScreen(1)}
                className="writerai-button create-page__body__generator__button--secondary"
              >
                Back
              </button>
              <button
                onClick={() => generateAiContent()}
                className="writerai-button create-page__body__generator__button--primary"
              >
                {loadingAiContent === true ? (
                  <>
                    <i
                      style={{ marginRight: 10 }}
                      className="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Generating...
                  </>
                ) : (
                  <>Generate</>
                )}
              </button>
            </div>
          </div>

          <div className="create-page__body__generator__results">
            {generatedAiContent.map((item) => (
              <div className="create-page__body__generator__result">
                <div className="create-page__body__generator__result__data">
                  {item.text}
                </div>
                <div className="create-page__body__generator__result__action_buttons">
                  <button
                    onClick={() => copyTextToClipboard(item.text)}
                    className="writerai-button"
                  >
                    <i className="material-icons">content_copy</i>Copy
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
