import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { HOST } from '../../constants/config';
import * as actionAuth from '../../actions/auth';
import * as actionComment from '../../actions/comment';

class ReplyComment extends Component {
  deleteReplyComment = async replycommentId => {
    const {
      auth,
      signOutRequest,
      getAllComment,
      postId,
      commentId,
      loadMoreReply,
    } = this.props;

    try {
      await axios.delete(
        `${HOST}/api/v1/posts/comment/${commentId}/reply/${replycommentId}`,
        {
          headers: { Authorization: `Bearer ${auth.user.token}` },
        }
      );
      loadMoreReply(commentId);
    } catch (e) {
      if (e.status === 403) {
        signOutRequest();
      }
    }
  };

  render() {
    const { data, auth } = this.props;
    return (
      <div className="comment-box__main">
        <div className="comment-box__header">
          <div className="comment-box__leftHeader">
            <div className="comment-box__avatar">
              <a href="/unknow">
                <img alt="comment-avatar" src={data.avatar} />
              </a>
            </div>
            <div className="comment-box__username">
              <a href="/unknow">{data.name}</a>
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
          {auth.user && data.user_id === auth.user.id ? (
            <span
              role="button"
              style={{ float: 'right', marginTop: '-30px' }}
              onClick={() => this.deleteReplyComment(data.id)}
            >
              x
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

ReplyComment.propTypes = {
  auth: PropTypes.object,
  data: PropTypes.object,
  signOutRequest: PropTypes.func,
  getAllComment: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComment);
