import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReplyComment from './ReplyComment';
import CommentForm from './CommentForm';
import { HOST } from '../../constants/config';

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
      // console.log(e);
    }
  };

  render() {
    const { data } = this.props;
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
                <ReplyComment key={idx} data={reply} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

CommentBox.propTypes = {
  data: PropTypes.object,
};

export default CommentBox;
