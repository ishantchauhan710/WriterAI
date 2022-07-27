import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../AppContext";
import YesNoDialog from "../../components/YesNoDialog";
import OptionsFab from "./components/OptionsFab";
import ShowPreview from "./components/ShowPreview";
import axios from "axios";
import { BASE_URL } from "../../other/Constants";
import { isUserLoggedIn, logoutUser } from "../../security/firebase";
const { Configuration, OpenAIApi } = require("openai");

export const CreatePage = ({ shouldLogout, setShouldLogout,token,setToken }) => {
  // State variables to store data for ai generator input, ai results, text editor title, content, split window state and other stuff

  const [aiInput, setAiInput] = useState("");
  const [generatedAiContent, setGeneratedAiContent] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingAiContent, setLoadingAiContent] = useState(false);
  const [content, setContent] = useState("");
  const [splitGenerator, setSplitGenerator] = useState(false);
  const [splitWriter, setSplitWriter] = useState(true);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const { setLoading, notify, projectName, setProjectName } = AppState();
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const { editMode, setEditMode, editProject, setEditProject } = AppState();

  // Function to split writer and generator screens on small screen devices
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

  // Function to update API count in user's profile
  const updateUserAPICount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `${BASE_URL}/user/updateApiCount`,
        {
          data: "writerai",
        },
        config
      );

      //console.log("User: ", result);
    } catch (e) {
      console.log("Error");
      notify("Error updating API count", "error");
    }
  };

  // Function to generate content using AI
  const generateAiContent = async () => {
    // If AI is fetching data, prevent from making repeated API calls
    if (loadingAiContent) {
      return;
    }
    // Store the input field text in a variable
    const inputText = aiInput;
    // Validate the input data for null value and minimum words
    if (!inputText) {
      notify("Input text cannot be empty");
      return;
    }
    if (inputText.split(" ").length < 5) {
      notify("Input text should contain atleast five words");
      return;
    }
    // Show loading progress bar
    setLoadingAiContent(true);
    // Initialize the AI configuration variable
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_AI_API_KEY,
    });
    // Create the AI Instance
    const openai = new OpenAIApi(configuration);
    // Get data from AI and store it in respective state variables
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
    //console.log("Content: ", response.data.choices);
    setLoadingAiContent(false);
    updateUserAPICount();
  };

  // Function to copy AI generated text results to clipboard
  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify("Text copied to cliboard", "success");
  };

  // Function to reset state variables
  const resetVariables = () => {
    setTitle("");
    setProjectName("");
    setContent("");
    setEditMode(false);
    setEditProject({});
  };

  // A project will have a name, a title and a content body
  // By default, we set the project name and title as the user opens the page
  useEffect(() => {
    if (editMode === false) {
      setTitle(projectName);
    }
  }, []);

  // Function to save project to database
  const saveProject = async () => {
    // Validate project variables for null values
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
      // Make the API Call
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        setLoading(true);
        const result = await axios.post(
          `${BASE_URL}/project/insert`,
          {
            title: projectName,
            description: title,
            content: content,
            coverImage: coverImageUrl ? coverImageUrl : "",
            timeStamp: new Date().getTime(),
          },
          config
        );

        if (result.data.status === 200) {
          notify("Project saved successfully", "success");
          resetVariables();
          navigate("/home");
        } else {
          notify("An unknown error occurred", "error");
          setLoading(false);
        }
      } catch (e) {
        notify(e.message, "error");
        setLoading(false);
      }
    }
  };

  // Function to update/edit project in database
  const updateProject = async () => {
    // Validate project variables for null values
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
      // Make the API Call
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        setLoading(true);
        console.log("Cover Image URL: ", coverImageUrl);
        const result = await axios.put(
          `${BASE_URL}/project/update?projectId=${editProject.id}`,
          {
            title: projectName,
            description: title,
            content: content,
            coverImage: coverImageUrl ? coverImageUrl : "",
            timeStamp: new Date().getTime(),
          },
          config
        );

        if (result.data.status === 200) {
          notify("Project saved successfully", "success");
          resetVariables();
          navigate("/home");
        } else {
          notify("An unknown error occurred", "error");
          setLoading(false);
        }
      } catch (e) {
        notify(e.message, "error");
        setLoading(false);
      }
    }
  };

  const handleProjectSave = () => {
    if (editMode === true) {
      updateProject();
    } else {
      saveProject();
    }
  };

  // When this page is opened, check if user is logged in. If not then navigate to landing page
  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn !== true) {
      navigate("/");
    }
  }, []);

  // Get token from local storage and store it in a state variable
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userInfo"));
    //console.log("Token in storage: ", userToken);

    if (userToken) {
      setToken(userToken);
      //console.log("Token: ", token) [WILL GIVE NULL DUE TO SYNC EXECUTION];
    }
  }, []);

  // Also assign corresponding values to text fields if in edit mode
  useEffect(() => {
    if (editMode === true) {
      setProjectName(editProject.title);
      setTitle(editProject.description);
      setContent(editProject.content);
      setCoverImageUrl(editProject.coverPic);
      // console.log(
      //   `Edit Mode:\nName: ${editProject.title}\nTitle: ${editProject.description}\nContent: ${editProject.content}\n Img: ${editProject.coverPic}\n`
      // );
    }
  }, [editProject]);

  // Function to logout a user
  const logout = () => {
    logoutUser();
    setToken(null);
    navigate("/");
  };

  // Logout user if token is invalid
  useEffect(() => {
    if (shouldLogout === true) {
      logout();
      setShouldLogout(false);
    }
  }, [shouldLogout]);

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
        yesAction={() => {
          resetVariables();
          navigate("/home");
        }}
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
            onClick={() => handleProjectSave()}
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
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
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
            {generatedAiContent.map((item, index) => (
              <div key={index} className="create-page__body__generator__result">
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
