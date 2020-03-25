import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArticleTravel extends Component {
  render() {
    return (
      <article className="post travel-post">
        <div className="article__left travel-article__left">
          <Link
            to="/post.html"
            style={{ backgroundImage: 'url(images/image_1.jpg)' }}
            className="article__thumb  travel-article__thumb"
          />
        </div>
        <div className=" article__right travel-article__right">
          <h3 className="article__title travel-article__title">
            <Link to="/post.html">A Loving Heart is the Truest Wisdom</Link>
          </h3>
          <p className="article__summary">
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic life One day however a small line of
            blind text by the name of Lorem Ipsum decided to leave for the far
            World of Grammar.
          </p>
          <div className="author">
            <div className="author__left">
              <img src="images/person_1.jpg" alt="this is a error" />
            </div>
            <div className="author__right">
              <span>Written by</span>
              <h3>
                <Link to="/href">Dave Lewis</Link>, June 28, 2019
              </h3>
            </div>
          </div>
          <div className="bottom-article">
            <div className="bottom-article__left">
              <Link to="/href" className="btn-continue-reading">
                Continue reading
              </Link>
            </div>
            <div className="bottom-article__right">
              <span>
                <i className="fas fa-heart" />3
              </span>
              <span>
                <i className="fas fa-eye" />
                100
              </span>
              <span>
                <i className="fas fa-comment" />5
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default ArticleTravel;
