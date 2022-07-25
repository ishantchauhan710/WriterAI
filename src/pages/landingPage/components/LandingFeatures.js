import React from "react";

export const LandingFeatures = () => {
  const data = [
    {
      title: "Inbuilt Text Editor",
      description:
        "You can make use of the inbuilt text editor to write your blogs, emails, letters, thesis and other stuff",
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
      title: "Publish Content",
      description:
        "You can directly publish the content from WriterAI to multiple platforms such as Hashnode, Medium and Dev.to",
      img: "publish",
    },
  ];

  return (
    <div className="landing-page__features">
      <div className="landing-page__features__heading">Features</div>
      <div className="landing-page__features__container">
        {data.map((item,index) => (
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
