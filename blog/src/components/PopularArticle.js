import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PopularArticle extends React.Component {
  showArticle = () => {
    const { allPopularArticle } = this.props;
    return allPopularArticle.map(article => (
      <li className="popular-item" key={article.id}>
        <div className="popular-item__left">
          <Link
            to={`/post/${article.linkPost}`}
            style={{
              backgroundImage: `url(${article.imgThumb})`,
            }}
            className="popular-item__thumb"
          />
        </div>
        <div className="popular-item__right">
          <h3>
            <Link
              to={`/post/${article.linkPost}`}
              className="popular-item__title"
            >
              {article.title}
            </Link>
          </h3>
          <ul className="popular-item__info">
            <li>
              <i className="far fa-calendar-alt" />
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
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
