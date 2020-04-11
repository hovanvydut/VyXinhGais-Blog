import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBarComp from '../components/SearchBar';
import CategoriesComp from '../components/Categories';
import PopularArticleComp from '../components/PopularArticle';
import HashTagComp from '../components/HashTag';
import NewsLetterComp from '../components/NewsLetter';
import PostComp from '../components/Post';
import LoadingBar from '../components/LoadingBar';
import * as postAction from '../actions/posts';
import * as actionTag from '../actions/tags';
import * as actionCategories from '../actions/categories';
import * as actionPopularArticle from '../actions/popularArticle';

class Post extends Component {
  componentDidMount() {
    const {
      match,
      getPost,
      getAllTags,
      allTags,
      getAllCategories,
      allCategories,
      allPopularArticle,
      getPopularArticle,
    } = this.props;
    const { linkPost } = match.params;
    getPost(linkPost);
    if (!allTags) getAllTags();
    if (!allCategories) getAllCategories();
    if (!allPopularArticle) getPopularArticle();
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

  render() {
    const {
      postDetail,
      allTags,
      allCategories,
      allPopularArticle,
    } = this.props;
    if (postDetail.status === 'failed') {
      return <Redirect to="/error" />;
    }
    return (
      <main>
        {this.showLoading()}
        <section className="posts full-post">
          <PostComp postDetail={postDetail} />
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

Post.propTypes = {
  match: PropTypes.object,
  getPost: PropTypes.func,
  postDetail: PropTypes.object,
  loading: PropTypes.object,
  allTags: PropTypes.array,
  getAllTags: PropTypes.func,
  allCategories: PropTypes.array,
  getAllCategories: PropTypes.func,
  allPopularArticle: PropTypes.array,
  getPopularArticle: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    postDetail: state.posts.post_detail,
    loading: state.ui.loading,
    allTags: state.tags.allTags,
    allCategories: state.categories.allCategories,
    allPopularArticle: state.popularArticle.allPopularArticle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: linkPost => dispatch(postAction.getPost(linkPost)),
    getAllTags: () => {
      dispatch(actionTag.getAllTags());
    },
    getAllCategories: () => {
      dispatch(actionCategories.getAllCategories());
    },
    getPopularArticle: () => {
      dispatch(actionPopularArticle.getPopularArticle());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
