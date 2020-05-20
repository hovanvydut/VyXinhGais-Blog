import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Prism from 'prismjs';
import * as actionComment from '../actions/comment';
import CommentForm from './comment/CommentForm';
import CommentBox from './comment/CommentBox';
import './stylesheets/prism.css';
import './stylesheets/comment.css';

class Post extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { postDetail, comments } = this.props;
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
                    <Link to={`/tag/${tag.name}`}>{tag.name}</Link>
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
        {/* Comment here */}
        <div>
          <CommentForm postId={postDetail.id} />
          {comments.map(data => (
            <CommentBox key={data.id} data={data} />
          ))}
        </div>
      </article>
    );
  }
}

Post.propTypes = {
  postDetail: PropTypes.object,
  comments: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    comments: state.comment.comments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllComments: postId =>
      dispatch(actionComment.getAllCommentRequest(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
