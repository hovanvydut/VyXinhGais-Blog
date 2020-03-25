import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

class Post extends Component {
  render() {
    const { postDetail } = this.props;
    const { content, author, tags } = postDetail;
    return (
      <article>
        {parse(String(content))}
        {/* AUTHOR AND TAGS */}
        <div className="full-post__tag">
          <ul>
            {tags
              ? tags.map(tag => (
                  <li key={tag._id}>
                    <a href={`/tags?name=${tag.name}`}>{tag.name}</a>
                  </li>
                ))
              : ''}
          </ul>
        </div>
        <div className="full-post__author">
          <div>
            <img src="images/person_1.jpg" alt="person_1.jpg" />
          </div>
          <div>
            <h3 className="full-post__author-name">
              {author ? author.name : ''}
            </h3>
            <p className="full-post__author-introduce">
              {author ? author.description : ''}
            </p>
          </div>
        </div>
      </article>
    );
  }
}

Post.propTypes = {
  postDetail: PropTypes.object
};

export default Post;
