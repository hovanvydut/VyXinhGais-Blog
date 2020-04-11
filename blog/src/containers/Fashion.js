import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionPost from '../actions/posts';
import ArticleComp from '../components/Article';
import LoadingBar from '../components/LoadingBar';
import PaginationComp from '../components/Pagination';

class Fashion extends Component {
  componentDidMount() {
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
      xhtml.push(<ArticleComp key={thumbItem.id} postThumbItem={thumbItem} />);
    });
    return xhtml;
  };

  render() {
    return (
      <main className="fashion-page">
        {this.showLoading()}
        <section className="posts">
          {this.renderThumb()}
          <PaginationComp />
        </section>
      </main>
    );
  }
}

Fashion.propTypes = {
  getThumb: PropTypes.func,
  thumbList: PropTypes.array,
  loading: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    thumbList: state.posts.post_thumb.home,
    loading: state.ui.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThumb: subject => {
      dispatch(actionPost.getThumb(subject));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fashion);
