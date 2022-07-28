import React, { useEffect, useState } from "react";
import YesNoDialog from "../../../components/YesNoDialog";

export const ProfileTab = ({ logout, userDetails }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <div id="tabProfile" className="home-page__tab-data">
      <YesNoDialog
        open={showLogoutDialog}
        setOpen={setShowLogoutDialog}
        title="Logout"
        message="Are you sure you want to log out?"
        yesAction={logout}
      />
      <div className="home-page__tab-data__section-label">Profile</div>
      <table className="home-page__tab-data__table">
        <tbody>
          <tr>
            <td>User Name</td>
            <td>{userDetails.data ? userDetails.data.username : "null"}</td>
          </tr>
          <tr>
            <td>User Email</td>
            <td>{userDetails.data ? userDetails.data.email : "null"}</td>
          </tr>

          <tr>
            <td>WriterAI Usage</td>
            <td>{userDetails.data ? userDetails.data.apiReqCount : "null"}</td>
          </tr>
          <tr>
            <td>Help</td>
            <td>
              <a
                style={{
                  textDecoration: "none",
                  color: "var(--colorPrimary)",
                  fontWeight: 500,
                }}
                target="_new"
                href="https://github.com/ishantchauhan710/WriterAI/blob/master/Docs.md"
              >
                WriterAI Docs
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="home-page__tab-data__button_container">
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="writerai-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
