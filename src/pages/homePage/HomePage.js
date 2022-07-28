import { useEffect, useState } from "react";
import { isUserLoggedIn, logoutUser } from "../../security/firebase";
import { ProfileTab } from "./components/ProfileTab";
import { ProjectTab } from "./components/ProjectTab";
import { AppState } from "../../AppContext";
import { DownloadTab } from "./components/DownloadTab";
import { BASE_URL } from "../../other/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateNewProjectDialog from "./components/dialogs/CreateNewProjectDialog";
import YesNoDialog from "../../components/YesNoDialog";
import { setRef } from "@mui/material";
import ShareProjectDialog from "./components/dialogs/ShareProjectDialog";
import RevokeShareProjectDialog from "./components/dialogs/RevokeShareProjectDialog";
import { ShareTab } from "./components/ShareTab";

export const HomePage = ({
  shouldLogout,
  setShouldLogout,
  token,
  setToken,
}) => {
  // States for showing dialog boxes, toggling tabs and storing data for token and projects
  const {
    setLoading,
    notify,
    userDetails,
    setUserDetails,
    editMode,
    setEditMode,
    editProject,
    setEditProject,
  } = AppState();
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showProjectsTab, setShowProjectsTab] = useState(false);
  const [showSharedTab, setShowSharedTab] = useState(false);
  const [showDownloadTab, setShowDownloadTab] = useState(false);
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [refreshUser, setRefreshUser] = useState(false);

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareProjectEmail, setShareProjectEmail] = useState("");
  const [projectToShare, setProjectToShare] = useState("");

  const navigate = useNavigate();

  // Function to logout a user
  const logout = () => {
    logoutUser();
    setToken(null);
    navigate("/");
  };

  // Function to show new project dialog
  const createNew = () => {
    setShowNewProjectDialog(true);
  };

  // Function to navigate to create project page
  const openCreatePage = () => {
    navigate("/create");
  };

  // Functions to toggle different tabs
  const showProjects = () => {
    setShowProjectsTab(true);
    setShowSharedTab(false);
    setShowDownloadTab(false);
    setShowProfileTab(false);
  };

  const showShared = () => {
    setShowProjectsTab(false);
    setShowSharedTab(true);
    setShowDownloadTab(false);
    setShowProfileTab(false);
  };

  const showDownload = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowDownloadTab(true);
    setShowProfileTab(false);
  };

  const showProfile = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowDownloadTab(false);
    setShowProfileTab(true);
  };

  // Function to get user's details from DB
  const getUser = async () => {
    //setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${BASE_URL}/user/getUser`, config);
      //console.log("Response: ", response);
      setUserDetails(response.data);
      //setLoading(false);
    } catch (e) {
      notify(e.message, "error");
      //setLoading(false);
    }
  };

  // Function to get user's projects from DB
  const getProjects = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(`${BASE_URL}/project/getProject`, config);
      //console.log("Result: ", result);
      setProjects(result.data.data);
      setLoading(false);
    } catch (e) {
      notify(e.message, "error");
      setLoading(false);
    }
  };

  // Function to open a project
  const openProject = (project) => {
    navigate("/create");
  };

  const [projectToDelete, setProjectToDelete] = useState({});

  // Function to delete a project
  const deleteProject = async () => {
    //console.log("Delete Project: ", projectToDelete);

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.delete(
        `${BASE_URL}/project/delete?projectId=${projectToDelete.id}`,
        config
      );
      // console.log("Result: ", result);
      setLoading(false);
      notify("Project deleted successfully!", "success");
      setRefreshProjects(true);
    } catch (e) {
      notify(e.message, "error");
      setLoading(false);
    }
  };

  // Function to share a project with others
  const shareProject = async () => {
    // console.log("Share Project: ", projectToShare);

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log("Config: ", config);
      // console.log("Token: ", token);

      const result = await axios.post(
        `${BASE_URL}/project/share?toEmail=${shareProjectEmail}&projectId=${projectToShare.id}`,
        {
          data: "writerai",
        },
        config
      );
      // console.log("Result: ", result);

      notify(`Project shared to ${shareProjectEmail} successfully!`, "success");
      //setLoading(false);
      setRefreshProjects(true);
    } catch (e) {
      notify(e.response.data.message, "error");
      setLoading(false);
    }
  };

  const [revokeAccessProject, setRevokeAccessProject] = useState({});
  const [showRevokeProjectDialog, setShowRevokeProjectDialog] = useState(false);

  // Function to revoke share access of a project with others
  const revokeProjectAccess = async (id) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //console.log("Config: ", config);
      //console.log("Token: ", token);
      //console.log(`Id: ${id}`);

      const result = await axios.post(
        `${BASE_URL}/project/revokeShare?shareId=${id}`,
        {
          data: "writerai",
        },
        config
      );
      //console.log("Result: ", result);

      //notify(`Project access revoled`, "success");
      //setLoading(false);
    } catch (e) {
      notify(e.response.data.message, "error");
      setLoading(false);
    }
  };

  // Function to revoke project access from multiple users
  const revokeProjectAccessToUsers = async (users) => {
    try {
      users.map(async (id, count) => {
        await revokeProjectAccess(id);

        // When we reach last iteration
        if (count === users.length - 1) {
          setRefreshProjects(true);
        }
      });
    } catch (e) {
      notify(e.message, "error");
      setLoading(false);
    }
  };

  const [projectsSharedToMe, setProjectsSharedToMe] = useState({});

  // Function to get projects that are shared to him by others
  const getProjectsSharedToMe = async () => {
    try {
      //console.log(token);
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        `${BASE_URL}/project/getSharedToMe`,
        config
      );
      //console.log("Result: ", result);
      setProjectsSharedToMe(result.data.data);
      setLoading(false);
    } catch (e) {
      notify(e.message, "error");
      setLoading(false);
    }
  };

  // When this page is opened, check if user is logged in. If not then navigate to landing page.
  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn !== true) {
      navigate("/");
    }
  }, []);

  // By default, show the project tab to user. Also reset some state variables.
  useEffect(() => {
    setEditMode(false);
    setEditProject({});
    showProjects();
  }, []);

  // When this page is opened, we get the local storage auth token and store it in a state variable
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userInfo"));
    //console.log("Token in storage: ", userToken);

    if (userToken) {
      setToken(userToken);
      //console.log("Token: ", token) [WILL GIVE NULL DUE TO SYNC EXECUTION];
    }
  }, []);

  // Whenever token's value changes from default null to a token contained value, we fetch the user details
  useEffect(() => {
    if (token) {
      getUser();
      //console.log(userDetails);
      getProjects();
      getProjectsSharedToMe();
    }
  }, [token]);

  // Also fetch the user projects whenever needed
  useEffect(() => {
    if (refreshProjects === true) {
      getProjects();
      setRefreshProjects(false);
    }
  }, [refreshProjects]);

  // Fetch the user whenever needed
  useEffect(() => {
    if (refreshUser === true) {
      setLoading(true);
      getUser();
      setLoading(false);
      setRefreshUser(false);
    }
  }, [refreshUser]);

  // Whenever edit mode is enabled, navigate to create page
  useEffect(() => {
    if (editMode === true) {
      openProject();
    }
  }, [editMode]);

  // Logout user if token is invalid
  useEffect(() => {
    if (shouldLogout === true) {
      logout();
      setShouldLogout(false);
    }
  }, [shouldLogout]);

  return (
    <div className="home-page">
      <YesNoDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        yesAction={() => deleteProject()}
      />

      <CreateNewProjectDialog
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

      <ShareProjectDialog
        open={showShareDialog}
        setOpen={setShowShareDialog}
        title="Share Project"
        message="Enter the email address of the user whom you want to share your project with"
        yesText="Ok"
        noText="Cancel"
        yesActionFunction={shareProject}
        notify={notify}
        input={shareProjectEmail}
        setInput={setShareProjectEmail}
        fieldPlaceholder="Eg. example@gmail.com"
      />

      <RevokeShareProjectDialog
        open={showRevokeProjectDialog}
        setOpen={setShowRevokeProjectDialog}
        title="Revoke Share Access"
        message="Check all the users from whom you want to revoke the project's access"
        yesText="Ok"
        noText="Cancel"
        notify={notify}
        input={shareProjectEmail}
        setInput={setShareProjectEmail}
        project={revokeAccessProject}
        revokeFunction={revokeProjectAccessToUsers}
      />

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
            showDownloadTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showDownload()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showDownloadTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              cloud_download
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showDownloadTab === true
                ? "home-page__tab-item__text--active"
                : ""
            }`}
          >
            Download
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
            {showProfileTab === false && showDownloadTab === false && (
              <button onClick={() => createNew()} className="writerai-button">
                Create New
              </button>
            )}
          </div>
        </div>

        <div className="home-page__tab-data-wrapper">
          {showProjectsTab === true && (
            <ProjectTab
              setShowDeleteDialog={setShowDeleteDialog}
              setProjectToDelete={setProjectToDelete}
              projects={projects ? projects : []}
              label="Your Projects"
              setShowShareDialog={setShowShareDialog}
              setProjectToShare={setProjectToShare}
              setRevokeAccessProject={setRevokeAccessProject}
              setShowRevokeProjectDialog={setShowRevokeProjectDialog}
            />
          )}

          {showSharedTab === true && (
            <ShareTab
              projects={projectsSharedToMe.length > 0 ? projectsSharedToMe : []}
              label="Shared To You"
            />
          )}

          {showDownloadTab === true && (
            <DownloadTab
              projectList={
                projects.length > 0 || projectsSharedToMe.length > 0
                  ? [...projects, ...projectsSharedToMe]
                  : []
              }
              notify={notify}
            />
          )}

          {showProfileTab === true && (
            <ProfileTab
              userDetails={userDetails}
              logout={logout}
              setRefreshUser={setRefreshUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};
