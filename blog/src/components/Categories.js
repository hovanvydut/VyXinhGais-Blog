import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  showAllCategories = () => {
    const { allCategories } = this.props;

    return allCategories.map(category => (
      <li key={category.id}>
        <a href={`/category/${category.linkCategory}`}>
          {category.name} <span>({category.countPost})</span>
        </a>
      </li>
    ));
  };

  render() {
    return (
      <div className="categories">
        <h3 className="categories__title">Categories</h3>
        <ul className="categories-list">{this.showAllCategories()}</ul>
      </div>
    );
  }
}

Categories.propTypes = {
  allCategories: PropTypes.array,
};

export default Categories;
