import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import axios from 'axios';
import { HOST } from '../../constants/config';
import * as actionComment from '../../actions/comment';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentCommentForm: '',
    };
  }

  handleChange = e => {
    this.setState({ contentCommentForm: e.target.value });
  };

  handleReply = async () => {
    const { postId, user, getAllComment } = this.props;
    const { contentCommentForm } = this.state;
    // posts/378a-fe9f-3974-e838-9023/comment
    await axios.post(
      `${HOST}/api/v1/posts/${postId}/comment`,
      {
        content: contentCommentForm,
        userId: user.id,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    getAllComment(postId);
  };

  render() {
    const { user } = this.props;
    const { contentCommentForm } = this.state;

    if (!user) {
      return (
        <h2>
          <Link to="/login" style={{ color: 'blue' }}>
            Đăng nhập
          </Link>{' '}
          để bình luận
        </h2>
      );
    }

    return (
      <div className="comment-form">
        <div className="comment-form__write">
          <div className="comment-form__avatar">
            <a href={`/user/${user.id}`}>
              <img alt="comment-avatar" src={user.avatar} />
            </a>
          </div>
          <div className="comment-form__editor">
            <TextareaAutosize
              className="comment-content"
              placeholder="Comment here :))"
              value={contentCommentForm}
              onChange={this.handleChange}
            />
            <div className="comment-tool" />
          </div>
        </div>
        <div className="comment-form__action">
          <button
            className={
              contentCommentForm.length > 0
                ? 'post-comment-btn post-comment-btn--show'
                : 'post-comment-btn'
            }
            type="button"
            onClick={this.handleReply}
          >
            Post comment
          </button>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  user: PropTypes.object,
  postId: PropTypes.string,
  getAllComment: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllComment: postId =>
      dispatch(actionComment.getAllCommentRequest(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
