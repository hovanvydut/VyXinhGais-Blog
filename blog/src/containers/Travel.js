import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PaginationComp from '../components/Pagination';
import SearchBarComp from '../components/SearchBar';
import CategoriesComp from '../components/Categories';
import PopularArticleComp from '../components/PopularArticle';
import HashTagComp from '../components/HashTag';
import NewsLetterComp from '../components/NewsLetter';
import ArticleTravel from '../components/ArticleTravel';
import * as actionTag from '../actions/tags';
import * as actionCategories from '../actions/categories';

class Travel extends Component {
  componentDidMount() {
    const { allTags, getAllTags, getAllCategories, allCategories } = this.props;
    if (!allTags) getAllTags();
    if (!allCategories) getAllCategories();
  }

  render() {
    const { allTags, allCategories } = this.props;
    return (
      <main className="travel-post">
        <section className="posts">
          <ArticleTravel />
          <ArticleTravel />
          <ArticleTravel />
          <PaginationComp />
        </section>
        <aside className="sidebar">
          <SearchBarComp />
          <CategoriesComp allCategories={allCategories || []} />
          <PopularArticleComp />
          <HashTagComp allTags={allTags || []} />
          <NewsLetterComp />
          <div className="categories">
            <h3 className="categories__title">Archives</h3>
            <ul className="categories-list">
              <li>
                <a href="/href">
                  Decob14 2018 <span>(6)</span>
                </a>
              </li>
              <li>
                <a href="/href">
                  September 2018 <span>(6)</span>
                </a>
              </li>
              <li>
                <a href="/href">
                  August 2018 <span>(6)</span> <span>(6)</span>
                </a>
              </li>
              <li>
                <a href="/href">
                  July 2018 <span>(6)</span>
                </a>
              </li>
              <li>
                <a href="/href">
                  June 2018 <span>(6)</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    );
  }
}

Travel.propTypes = {
  allTags: PropTypes.array,
  getAllTags: PropTypes.func,
  allCategories: PropTypes.array,
  getAllCategories: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    allTags: state.tags.allTags,
    allCategories: state.categories.allCategories,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllTags: () => {
      dispatch(actionTag.getAllTags());
    },
    getAllCategories: () => {
      dispatch(actionCategories.getAllCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Travel);
