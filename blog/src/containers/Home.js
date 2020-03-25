import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from '../components/LoadingBar';
import * as actionPost from '../actions/posts';
import ArticleComp from '../components/Article';
import CategoriesComp from '../components/Categories';
import HashTagComp from '../components/HaskTag';
import NewsLetterComp from '../components/NewsLetter';
import PaginationComp from '../components/Pagination';
import PopularArticleComp from '../components/PopularArticle';
import SearchBarComp from '../components/SearchBar';

class Home extends Component {
  componentDidMount() {
    console.log('Home: component did mount');
    const { getThumb } = this.props;
    getThumb('newest');
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
      xhtml.push(<ArticleComp key={thumbItem._id} postThumbItem={thumbItem} />);
    });
    return xhtml;
  };

  render() {
    return (
      <main>
        <section className="posts">
          {this.showLoading()}
          {this.renderThumb()}
          <PaginationComp />
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

Home.propTypes = {
  getThumb: PropTypes.func,
  thumbList: PropTypes.array,
  loading: PropTypes.object
};

const mapStateToProps = state => {
  return {
    thumbList: state.posts.post_thumb.home,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThumb: subject => {
      dispatch(actionPost.getThumb(subject));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
