import React, { Component } from 'react';

class ReplyComment extends Component {
  render() {
    const { data } = this.props;
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
      </div>
    );
  }
}

export default ReplyComment;
