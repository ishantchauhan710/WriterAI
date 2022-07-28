import React from "react";

export const LandingFeatures = () => {
  const data = [
    {
      title: "Inbuilt Text Editor",
      description:
        "Make use of the inbuilt project editor to write and download your blogs, emails, letters and other stuff",
      img: "edit",
    },
    {
      title: "Auto Text Generation",
      description:
        "Quickly generate high quality content by providing the AI with some sample text as input",
      img: "autorenew",
    },
    {
      title: "Markdown Support",
      description:
        "Easily add tables, images, hyperlinks, lists, code snippets and preview them in markdown format",
      img: "art_track",
    },
    {
      title: "Share Projects",
      description:
        "You can work on a project in team by providing others with the project access",
      img: "screen_share",
    },
  ];

  return (
    <div id="features" className="landing-page__features">
      <div className="landing-page__features__heading">Features</div>
      <div className="landing-page__features__container">
        {data.map((item, index) => (
          <div key={index} className="landing-page__features__feature">
            <div className="landing-page__features__feature-img">
              <div className="landing-page__features__feature-img-bg">
                <i className="material-icons">{item.img}</i>
              </div>
            </div>
            <div className="landing-page__features__feature-title">
              {item.title}
            </div>
            <div className="landing-page__features__feature-description">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
