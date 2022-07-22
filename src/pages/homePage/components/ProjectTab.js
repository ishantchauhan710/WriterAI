import React from "react";

export const ProjectTab = () => {
  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">Your Projects</div>
      <div className="home-page__tab-data__new-card-container">
        <div className="home-page__tab-data__content-card">
          <div className="home-page__tab-data__content-card__img">
            <img src="https://github.com/Vaibhav2002/DocuBox-AndroidApp/raw/master/media/cover.png" />
            <div className="home-page__tab-data__content-card__menu_button">
              <i className="material-icons">more_vert</i>
            </div>
          </div>
          <div className="home-page__tab-data__content-card__data">
            <div className="home-page__tab-data__content-card__data__title">
              Lorem Ipsum{" "}
            </div>
            <div className="home-page__tab-data__content-card__data__description">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem
              Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
