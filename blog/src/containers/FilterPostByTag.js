import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from '../components/LoadingBar';
import * as actionPost from '../actions/posts';
import * as actionTag from '../actions/tags';
import * as actionCategory from '../actions/categories';
import * as actionPopularArticle from '../actions/popularArticle';
import * as actionSearch from '../actions/search';
import ArticleComp from '../components/Article';
import CategoriesComp from '../components/Categories';
import HashTagComp from '../components/HashTag';
import NewsLetterComp from '../components/NewsLetter';
import PaginationComp from '../components/Pagination';
import PopularArticleComp from '../components/PopularArticle';
import SearchBarComp from '../components/SearchBar';

class FilterPostByTag extends Component {
  componentDidMount() {
    const {
      getThumb,
      getAllTags,
      getAllCategories,
      getPopularArticle,
      match,
      filterPostByTag,
      filterPostByCategory,
      location,
      searchPostName,
    } = this.props;

    const searchParam = new URLSearchParams(location.search);

    if (match.params?.tagName) filterPostByTag(match.params.tagName);
    else if (match.params?.linkCategory)
      filterPostByCategory(match.params.linkCategory);
    else if (searchParam.has('postName'))
      searchPostName(searchParam.get('postName'));
    else getThumb('newest');

    getAllTags();
    getAllCategories();
    getPopularArticle();
  }

  showLoading = () => {
    let html = '';
    const { loading } = this.props;
    const { show } = loading;
    if (show) {
      html = <LoadingBar />;
    }
    return html;
  };

  renderThumb = () => {
    const { thumbList } = this.props;
    const xhtml = [];
    thumbList.forEach(thumbItem => {
      xhtml.push(<ArticleComp key={thumbItem.id} postThumbItem={thumbItem} />);
    });
    return xhtml;
  };

  render() {
    const { allTags, allCategories, allPopularArticle } = this.props;
    return (
      <main>
        <section className="posts">
          {this.showLoading()}
          {this.renderThumb()}
          <PaginationComp />
        </section>
        <aside className="sidebar">
          <SearchBarComp />
          <CategoriesComp allCategories={allCategories || []} />
          <PopularArticleComp allPopularArticle={allPopularArticle || []} />
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

FilterPostByTag.propTypes = {
  getThumb: PropTypes.func,
  thumbList: PropTypes.array,
  loading: PropTypes.object,
  getAllTags: PropTypes.func,
  allTags: PropTypes.array,
  allCategories: PropTypes.array,
  getAllCategories: PropTypes.func,
  getPopularArticle: PropTypes.func,
  allPopularArticle: PropTypes.array,
  match: PropTypes.object,
  location: PropTypes.object,
  searchPostName: PropTypes.func,
  filterPostByTag: PropTypes.func,
  filterPostByCategory: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    thumbList: state.posts.post_thumb.home,
    loading: state.ui.loading,
    allTags: state.tags.allTags,
    allCategories: state.categories.allCategories,
    allPopularArticle: state.popularArticle.allPopularArticle,
    filterPostByTag: PropTypes.func,
    filterPostByCategory: PropTypes.func,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThumb: subject => {
      dispatch(actionPost.getThumb(subject));
    },
    getAllTags: () => {
      dispatch(actionTag.getAllTags());
    },
    getAllCategories: () => {
      dispatch(actionCategory.getAllCategories());
    },
    getPopularArticle: () => {
      dispatch(actionPopularArticle.getPopularArticle());
    },
    filterPostByTag: tagName => dispatch(actionTag.filterPostByTag(tagName)),
    filterPostByCategory: linkCategory =>
      dispatch(actionCategory.filterPostByCategory(linkCategory)),
    searchPostName: postName => dispatch(actionSearch.searchPostName(postName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPostByTag);
