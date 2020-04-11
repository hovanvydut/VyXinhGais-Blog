import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Article extends React.Component {
  render() {
    const { postThumbItem } = this.props;
    const {
      title,
      description,
      imgThumb,
      linkPost,
      created_at,
      category,
      countView,
    } = postThumbItem;
    const link = `/post/${linkPost}`;
    return (
      <article className="post">
        <div className="article__left">
          <Link
            to={link}
            style={{
              backgroundImage: `url(${imgThumb})`,
            }}
            className="article__thumb"
          />
        </div>
        <div className=" article__right">
          <h3 className="article__title">
            <Link to={link}>{title}</Link>
          </h3>
          <div className="article__info">
            <div>
              <i className="far fa-calendar-alt" />
              <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            <div>
              <i className="far fa-folder-open" />
              <span>{category}</span>
            </div>
            <div>
              <i className="far fa-eye" />
              <span>{countView}</span>
            </div>
          </div>
          <p className="article__summary">{description}</p>
          <div className="btn-container">
            <Link to={link} className="btn-readmore">
              Read More &gt;
            </Link>
          </div>
        </div>
      </article>
    );
  }
}

Article.propTypes = {
  postThumbItem: PropTypes.object,
};

export default Article;
