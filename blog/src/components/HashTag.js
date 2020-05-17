import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tagActionCreator from '../actions/tags';

class HashTag extends React.Component {
  handleClickTag = tagName => {
    const { filterPostByTag } = this.props;
    filterPostByTag(tagName);
  };

  showAllTag = () => {
    const { allTags } = this.props;
    return allTags.map(tag => (
      <li key={tag.id}>
        <Link
          to={`/tag/${tag.name}`}
          onClick={() => this.handleClickTag(tag.name)}
        >
          {`${tag.name.toUpperCase()} (${tag.countPost})`}
        </Link>
      </li>
    ));
  };

  render() {
    return (
      <div className="hash-tag">
        <h3>Tag Cloud</h3>
        <ul className="tag-list">{this.showAllTag()}</ul>
      </div>
    );
  }
}

HashTag.propTypes = {
  allTags: PropTypes.array,
  filterPostByTag: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    filterPostByTag: tagName =>
      dispatch(tagActionCreator.filterPostByTag(tagName)),
  };
};

export default connect(null, mapDispatchToProps)(HashTag);
