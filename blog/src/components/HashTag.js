import React from 'react';
import PropTypes from 'prop-types';

class HashTag extends React.Component {
  showAllTag = () => {
    const { allTags } = this.props;
    return allTags.map(tag => (
      <li key={tag.id}>
        <a href={`/tags/${tag.name}`}>
          {`${tag.name.toUpperCase()} (${tag.countPost})`}
        </a>
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
};

export default HashTag;
