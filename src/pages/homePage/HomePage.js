import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDialog from "../../components/FormDialog";
import { isUserLoggedIn, logoutUser } from "../../firebase/firebase";
import { ProfileTab } from "./components/ProfileTab";
import { ProjectTab } from "./components/ProjectTab";
import { AppState } from "../../AppContext";
import { PublishTab } from "./components/PublishTab";
import axios from "axios";
import { BASE_URL } from "../../other/Constants";

export const HomePage = () => {
  const projectss = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 10,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 11,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 12,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
  ];

  const navigate = useNavigate();

  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const { setLoading, notify, userDetails, setUserDetails } = AppState();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const createNew = () => {
    setShowNewProjectDialog(true);
  };

  const openCreatePage = () => {
    navigate("/create");
  };

  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn !== true) {
      navigate("/");
    }
  }, []);

  const [showProjectsTab, setShowProjectsTab] = useState(false);
  const [showSharedTab, setShowSharedTab] = useState(false);
  const [showPublishTab, setShowPublishTab] = useState(false);
  const [showProfileTab, setShowProfileTab] = useState(false);

  const [activateProjectsTab, setActivateProjectsTab] = useState(false);
  const [activateSharedTab, setActivateSharedTab] = useState(false);
  const [activatePublishTab, setActivatePublishTab] = useState(false);
  const [activateProfileTab, setActivateProfileTab] = useState(false);

  const showProjects = () => {
    setShowProjectsTab(true);
    setShowSharedTab(false);
    setShowPublishTab(false);
    setShowProfileTab(false);
  };

  const showShared = () => {
    setShowProjectsTab(false);
    setShowSharedTab(true);
    setShowPublishTab(false);
    setShowProfileTab(false);
  };

  const showPublish = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowPublishTab(true);
    setShowProfileTab(false);
  };

  const showProfile = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowPublishTab(false);
    setShowProfileTab(true);
  };

  useEffect(() => {
    showProjects();
  }, []);

  const getUser = async () => {
    // console.log("Token: ", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}/user/getUser`, config);
    console.log("Response: ", response);
    setUserDetails(response.data);
  };

  const [token, setToken] = useState(null);

  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.get(`${BASE_URL}/project/getProject`, config);
    //console.log("Result: ",result);
    setProjects(result.data.data);
  };

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userInfo"));
    //console.log("Token in storage: ", userToken);

    if (userToken) {
      setToken(userToken);
      //console.log("Token: ", token) [WILL GIVE NULL DUE TO SYNC EXECUTION];
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
      getProjects();
    }
  }, [token]);

 

  return (
    <div className="home-page">
      {showNewProjectDialog === true && (
        <FormDialog
          open={showNewProjectDialog}
          setOpen={setShowNewProjectDialog}
          title="Create Project"
          message="Enter the name of the project you want to create?"
          fieldPlaceholder="Eg. Hashnode Project Blog"
          yesText="Create"
          noText="Cancel"
          yesActionFunction={openCreatePage}
          notify={notify}
        />
      )}
      <div className="home-page__tab">
        <div
          className={`home-page__tab-item ${
            showProjectsTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showProjects()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showProjectsTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              note_add
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showProjectsTab === true
                ? "home-page__tab-item__text--active"
                : ""
            }`}
          >
            Projects
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showSharedTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showShared()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showSharedTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              people
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showSharedTab === true ? "home-page__tab-item__text--active" : ""
            }`}
          >
            Shared
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showPublishTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showPublish()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showPublishTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              publish
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showPublishTab === true ? "home-page__tab-item__text--active" : ""
            }`}
          >
            Publish
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showProfileTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showProfile()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showProfileTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              account_circle
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showProfileTab === true ? "home-page__tab-item__text--active" : ""
            }`}
          >
            Profile
          </div>
        </div>
      </div>

      <div className="home-page__main">
        <div className="home-page__header">
          <div className="home-page__header__logo ">WriterAi</div>

          <div className="home-page__header__buttons">
            {showProfileTab === false && showPublishTab === false && (
              <button onClick={() => createNew()} className="writerai-button">
                Create New
              </button>
            )}
          </div>
        </div>

        <div className="home-page__tab-data-wrapper">
          {showProjectsTab === true && (
            <ProjectTab projects={projects} label="Your Projects" />
          )}

          {showSharedTab === true && (
            <ProjectTab projects={projects} label="Shared" />
          )}

          {showPublishTab === true && (
            <PublishTab projects={projects} label="Publish Your Projects" />
          )}

          {showProfileTab === true && (
            <ProfileTab userDetails={userDetails} logout={logout} />
          )}
        </div>
      </div>
    </div>
  );
};
