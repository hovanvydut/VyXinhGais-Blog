import React from 'react';

class PopularArticle extends React.Component {
  render() {
    return (
      <div className="popular">
        <h3>Popular Articles</h3>
        <ul className="popular-list">
          <li className="popular-item">
            <div className="popular-item__left">
              <div
                href="/href"
                style={{
                  backgroundImage: 'url(images/image_2.jpg)'
                }}
                className="popular-item__thumb"
              />
            </div>
            <div className="popular-item__right">
              <h3>
                <a href="/href" className="popular-item__title">
                  Even the all-powerful Pointing has no control
                </a>
              </h3>
              <ul className="popular-item__info">
                <li>
                  <i className="far fa-calendar-alt" />
                  <span>June 28, 2019</span>
                </li>
                <li>
                  <i className="fas fa-user" />
                  <span>Dave Lewis</span>
                </li>
                <li>
                  <i className="fas fa-comment" />
                  <span>10</span>
                </li>
              </ul>
            </div>
          </li>
          <li className="popular-item">
            <div className="popular-item__left">
              <div
                href="/href"
                style={{
                  backgroundImage: 'url(images/image_1.jpg)'
                }}
                className="popular-item__thumb"
              />
            </div>
            <div className="popular-item__right">
              <h3>
                <a href="/href" className="popular-item__title">
                  Even the all-powerful Pointing has no control
                </a>
              </h3>
              <ul className="popular-item__info">
                <li>
                  <i className="far fa-calendar-alt" />
                  <span>June 28, 2019</span>
                </li>
                <li>
                  <i className="fas fa-user" />
                  <span>Dave Lewis</span>
                </li>
                <li>
                  <i className="fas fa-comment" />
                  <span>10</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default PopularArticle;
