import React from "react";

export const ProjectTab = () => {
  const projects = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 10,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 11,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 12,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
  ];

  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">Your Projects</div>
      <div className="home-page__tab-data__new-card-container">
        {projects.map((item) => (
          <div className="home-page__tab-data__content-card">
            <div className="home-page__tab-data__content-card__img">
              <img src={item.image} />
              <div className="home-page__tab-data__content-card__menu_button">
                <i className="material-icons">more_vert</i>
              </div>
            </div>
            <div className="home-page__tab-data__content-card__data">
              <div className="home-page__tab-data__content-card__data__title">
                {item.title}
              </div>
              <div className="home-page__tab-data__content-card__data__description">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
