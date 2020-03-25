import React from 'react';

class NewsLetter extends React.Component {
  render() {
    return (
      <div
        className="news-letter"
        style={{
          backgroundImage: 'url(images/bg_news_letter.jpg)'
        }}
      >
        <div className="blur-bg" />
        <h3>Newsletter</h3>
        <p className="news-letter__description">
          Far far away, behind the word mountains, far from the countries
          Vokalia
        </p>
        <input type="text" placeholder="Email Address" autoComplete="off" />
        <a href="/href" className="news-letter__btn">
          Subscribe
        </a>
      </div>
    );
  }
}

export default NewsLetter;
