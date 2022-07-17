import React from "react";

export const CreatePage = () => {
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
        <button className="writerai-button writerai-header__button--secondary">Preview</button>
        <button className="writerai-button writerai-header__button--primary">Save</button>
          
        </div>
      </div>
      <div className="writerai-document">
        <div className="writerai-writer">Write</div>
        <div className="writerai-generate">Write</div>
      </div>
    </div>
  );
};
