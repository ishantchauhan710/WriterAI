import React from "react";

export const PublishTab = () => {
  return (
    <div id="tabProfile" className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">
        Publish Your Projects
      </div>
      <div className="home-page__tab-data__publish-form">
        <label>Select Platform</label>
        <select className="home-page__tab-data__publish-form__input-dropdown">
          <option value="hashnode">Hashnode</option>
          <option value="medium">Medium</option>
          <option value="dev.to">Dev.To</option>
        </select>

        <label>Authorization Token</label>
        <input
          type="text"
          placeholder="Authorization Token"
          className="home-page__tab-data__publish-form__input-text"
        />

        <label>Content Type</label>
        <select className="home-page__tab-data__publish-form__input-dropdown">
          <option value="hashnode">Markdown</option>
          <option value="medium">Json</option>
        </select>

        <label>Project To Publish</label>
        <select className="home-page__tab-data__publish-form__input-dropdown">
          <option value="b1">Blog 1</option>
          <option value="b2">Blog 2</option>
        </select>

        <label>Hashtags</label>
        <input
          type="text"
          placeholder="Seperate them with spaces"
          className="home-page__tab-data__publish-form__input-text"
        />

        <label>Cover Image URL</label>
        <input
          type="text"
          placeholder="Paste Image URL Here"
          className="home-page__tab-data__publish-form__input-text"
        />

        <input
          className="writerai-button home-page__tab-data__publish-form__button"
          type="submit"
          value="Publish"
        />
      </div>
    </div>
  );
};
