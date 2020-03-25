import React from 'react';

class Pagination extends React.Component {
  render() {
    return (
      <ul className="pagination">
        <li>
          <a href="/href">&lt;</a>
        </li>
        <li className="active">
          <a href="/href">1</a>
        </li>
        <li>
          <a href="/href">2</a>
        </li>
        <li>
          <a href="/href">3</a>
        </li>
        <li>
          <a href="/href">4</a>
        </li>
        <li>
          <a href="/href">5</a>
        </li>
        <li>
          <a href="/href">&gt;</a>
        </li>
      </ul>
    );
  }
}

export default Pagination;
