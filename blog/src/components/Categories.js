import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actionCategory from '../actions/categories';

class Categories extends React.Component {
  handleClickCategory = linkCategory => {
    const { filterPostByCategory } = this.props;
    filterPostByCategory(linkCategory);
  };

  showAllCategories = () => {
    const { allCategories } = this.props;

    return allCategories.map(category => (
      <li key={category.id}>
        <Link
          to={`/category/${category.linkCategory}`}
          onClick={() => this.handleClickCategory(category.linkCategory)}
        >
          {category.name} <span>({category.countPost})</span>
        </Link>
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
  filterPostByCategory: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    filterPostByCategory: linkCategory =>
      dispatch(actionCategory.filterPostByCategory(linkCategory)),
  };
};

export default connect(null, mapDispatchToProps)(Categories);
