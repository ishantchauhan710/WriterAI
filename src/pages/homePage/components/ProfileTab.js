import React from "react";

export const ProfileTab = ({logout}) => {
  return (
    <div id="tabProfile" className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">Profile</div>
      <table className="home-page__tab-data__table">
        <tr>
          <td>User Name</td>
          <td>Ishant Chauhan</td>
        </tr>
        <tr>
          <td>User Email</td>
          <td>ishant@gmail.com</td>
        </tr>

        <tr>
          <td>Account Created</td>
          <td>7 Oct 2021</td>
        </tr>

        <tr>
          <td>Total Projects</td>
          <td>27</td>
        </tr>

        <tr>
          <td>WriterAI Usage</td>
          <td>27 Requests</td>
        </tr>
      </table>
      <div className="home-page__tab-data__button_container">
        <button onClick={() => logout()} className="writerai-button">Logout</button>
      </div>
    </div>
  );
};
