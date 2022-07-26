import { createContext, useContext, useState } from "react";

const AppContextProvider = createContext();

const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("error");

  const [userDetails, setUserDetails] = useState({});
  const [projectName, setProjectName] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editProject, setEditProject] = useState({});

  const notify = (message, type = "error") => {
    if (!message) {
      console.log("An unknown error occurred");
    }

    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <AppContextProvider.Provider
      value={{
        loading,
        setLoading,
        showNotification,
        setShowNotification,
        notificationMessage,
        setNotificationMessage,
        notificationType,
        setNotificationType,
        notify,
        userDetails,
        setUserDetails,
        projectName,
        setProjectName,
        editMode,
        setEditMode,
        editProject,
        setEditProject,
      }}
    >
      {children}
    </AppContextProvider.Provider>
  );
};

export default AppContext;

export const AppState = () => {
  return useContext(AppContextProvider);
};
