import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBarComp from '../components/SearchBar';
import CategoriesComp from '../components/Categories';
import PopularArticleComp from '../components/PopularArticle';
import HashTagComp from '../components/HaskTag';
import NewsLetterComp from '../components/NewsLetter';
import PostComp from '../components/Post';
import LoadingBar from '../components/LoadingBar';
import * as postAction from '../actions/posts';

class Post extends Component {
  componentDidMount() {
    const { match, getPost } = this.props;
    const { linkPost } = match.params;
    getPost(linkPost);
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
    const { postDetail } = this.props;
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
          <CategoriesComp />
          <PopularArticleComp />
          <HashTagComp />
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
  loading: PropTypes.object
};

const mapStateToProps = state => {
  return {
    postDetail: state.posts.post_detail,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: linkPost => dispatch(postAction.getPost(linkPost))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
