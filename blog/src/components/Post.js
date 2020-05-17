import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Prism from 'prismjs';
import '../containers/stylesheets/prism.css';

class Post extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { postDetail } = this.props;
    const { content, authorName, linkAvatarOfAuthor, tags } = postDetail;
    return (
      <article>
        <h1 className="full-post__main-title">{postDetail.title}</h1>
        <p className="full-post__para" style={{ color: 'gray' }}>
          {postDetail.description}
        </p>
        {parse(String(content))}
        <br />
        <br />
        {/* AUTHOR AND TAGS */}
        <div className="full-post__tag">
          <ul>
            {tags
              ? tags.map(tag => (
                  <li key={tag.id}>
                    <a href={`/tags?name=${tag.name}`}>{tag.name}</a>
                  </li>
                ))
              : ''}
          </ul>
        </div>
        <div className="full-post__author">
          <div>
            <img src={linkAvatarOfAuthor} alt={authorName} />
          </div>
          <div>
            <h3 className="full-post__author-name">{authorName}</h3>
            <p className="full-post__author-introduce">
              Fill introduction here
            </p>
          </div>
        </div>
      </article>
    );
  }
}

Post.propTypes = {
  postDetail: PropTypes.object,
};

export default Post;
