import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReplyComment from './ReplyComment';
import CommentForm from './CommentForm';
import { HOST } from '../../constants/config';
import * as actionAuth from '../../actions/auth';
import * as actionComment from '../../actions/comment';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyComments: [],
      showForm: false,
    };
  }

  showCommentForm = commentId => {
    this.setState({ showForm: true });
    this.loadMoreReply(commentId);
  };

  hideCommentForm = () => {
    this.setState({ showForm: false });
  };

  loadMoreReply = async commentId => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${HOST}/api/v1/posts/comment/${commentId}/reply`,
      });
      this.setState({ replyComments: res.data });
    } catch (e) {
      // nothing
    }
  };

  deleteComment = async commentId => {
    const { auth, signOutRequest, getAllComment, postId } = this.props;

    try {
      await axios.delete(`${HOST}/api/v1/posts/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${auth.user.token}` },
      });
      getAllComment(postId);
    } catch (e) {
      if (e.status === 403) {
        signOutRequest();
      }
    }
  };

  render() {
    const { data, auth } = this.props;
    const { replyComments, showForm } = this.state;
    return (
      <div className="comment-box">
        <div className="comment-box__main">
          <div className="comment-box__header">
            <div className="comment-box__leftHeader">
              <div className="comment-box__avatar">
                <a href={`/user/${data.user_id}`}>
                  <img alt="avatar" src={data.avatar} />
                </a>
              </div>
              <div className="comment-box__username">
                <a href={`/user/${data.user_id}`}>{data.name}</a>
              </div>
            </div>
            <div className="comment-box__rightHeader">
              <div className="comment-box__created-at">
                <span>{new Date(data.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="comment-box-content">{data.content}</div>
          <div className="comment-box__footer">
            <span role="button" onClick={() => this.showCommentForm(data.id)}>
              Reply
            </span>
            <span role="button" onClick={() => this.loadMoreReply(data.id)}>
              {data.countReplyComment > 0
                ? `${data.countReplyComment} reply`
                : ''}
            </span>
            {auth.user && data.user_id === auth.user.id ? (
              <span
                role="button"
                style={{ float: 'right', marginTop: '-30px' }}
                onClick={() => this.deleteComment(data.id)}
              >
                x
              </span>
            ) : null}
          </div>
        </div>
        <div className="list-reply-comment">
          {showForm ? (
            <CommentForm
              commentId={data.id}
              loadMoreReply={this.loadMoreReply}
              hideCommentForm={this.hideCommentForm}
            />
          ) : null}
          {replyComments.length > 0
            ? replyComments.map((reply, idx) => (
                <ReplyComment
                  key={idx}
                  data={reply}
                  commentId={data.id}
                  loadMoreReply={this.loadMoreReply}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

CommentBox.propTypes = {
  data: PropTypes.object,
  signOutRequest: PropTypes.func,
  auth: PropTypes.object,
  getAllComment: PropTypes.func,
  postId: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    auth: state.Auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOutRequest: () => dispatch(actionAuth.signOut()),
    getAllComment: postId =>
      dispatch(actionComment.getAllCommentRequest(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
