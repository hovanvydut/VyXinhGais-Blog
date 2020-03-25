import React from 'react';

class HashTag extends React.Component {
  render() {
    return (
      <div className="hash-tag">
        <h3>Tag Cloud</h3>
        <ul className="tag-list">
          <li>
            <a href="/href">ANIMALS</a>
          </li>
          <li>
            <a href="/href">Human</a>
          </li>
          <li>
            <a href="/href">People</a>
          </li>
          <li>
            <a href="/href">Cat</a>
          </li>
          <li>
            <a href="/href">Dog</a>
          </li>
          <li>
            <a href="/href">Nature</a>
          </li>
          <li>
            <a href="/href">Leave</a>
          </li>
          <li>
            <a href="/href">Food</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default HashTag;
