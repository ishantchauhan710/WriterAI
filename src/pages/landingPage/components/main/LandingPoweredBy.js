import React from "react";

export const LandingPoweredBy = () => {
  const data = [
    {
      title: "Planet Scale",
      description:
        "A highly scalable MySQL database platform which supports horizontal sharding and unlimited connections",
      img: "./planetscale.png",
      size: 15,
    },
    {
      title: "ReactJS",
      description:
        "A frontend JavaScript library created by Facebook, it is widely used for building amazing user interfaces",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/862px-React-icon.svg.png",
      size: 10,
    },
    {
      title: "Ktor",
      description:
        "Ktor is a Kotlin based framework that enable developers to write asynchronous clients and servers applications in Kotlin language",
      img: "https://avatars.githubusercontent.com/u/28214161?s=280&v=4",
      size: 10,
    },
    {
      title: "Linode",
      description:
        "An american cloud hosting server provider, Linode offers plenty of hosting options to host your websites",
      img: "https://seeklogo.com/images/L/linode-logo-0B22204438-seeklogo.com.png?v=637829616520000000",
      size: 10,
    },
  ];

  return (
    <div className="landing-page__poweredby">
      <div id="poweredby" className="landing-page__poweredby__heading">
        Built With
      </div>
      <div className="landing-page__poweredby__container">
        {data.map((item, index) => (
          <div key={index} className="landing-page__poweredby__item">
            <div className="landing-page__features__feature-img">
              <img
                style={{ padding: item.size }}
                className="landing-page__poweredby__img"
                src={item.img}
              />
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
