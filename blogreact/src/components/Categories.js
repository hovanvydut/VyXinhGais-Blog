import React from 'react';

class Categories extends React.Component {
  render() {
    return (
      <div className="categories">
        <h3 className="categories__title">Categories</h3>
        <ul className="categories-list">
          <li>
            <a href="/href">
              Fashion <span>(6)</span>
            </a>
          </li>
          <li>
            <a href="/href">
              Technology <span>(6)</span>
            </a>
          </li>
          <li>
            <a href="/href">
              Travel <span>(6)</span>
            </a>
          </li>
          <li>
            <a href="/href">
              Food <span>(6)</span>
            </a>
          </li>
          <li>
            <a href="/href">
              Photography <span>(6)</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Categories;
