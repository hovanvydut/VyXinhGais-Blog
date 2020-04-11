import React from 'react';
import PropTypes from 'prop-types';

class PopularArticle extends React.Component {
  showArticle = () => {
    const { allPopularArticle } = this.props;
    return allPopularArticle.map(article => (
      <li className="popular-item" key={article.id}>
        <div className="popular-item__left">
          <div
            href={`/posts/${article.linkPost}`}
            style={{
              backgroundImage: `url(${article.imgThumb})`,
            }}
            className="popular-item__thumb"
          />
        </div>
        <div className="popular-item__right">
          <h3>
            <a
              href={`/posts/${article.linkPost}`}
              className="popular-item__title"
            >
              {article.title}
            </a>
          </h3>
          <ul className="popular-item__info">
            <li>
              <i className="far fa-calendar-alt" />
              <span>{new Date(article.created_at).toLocaleString()}</span>
            </li>
            <li>
              <i className="fas fa-user" />
              <span>{article.authorName}</span>
            </li>
            <li>
              <i className="far fa-eye" />
              <span>{article.countView}</span>
            </li>
          </ul>
        </div>
      </li>
    ));
  };

  render() {
    return (
      <div className="popular">
        <h3>Popular Articles</h3>
        <ul className="popular-list">{this.showArticle()}</ul>
      </div>
    );
  }
}

PopularArticle.propTypes = {
  allPopularArticle: PropTypes.array,
};

export default PopularArticle;
