import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionSearch from '../actions/search';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postName: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const searchParam = new URLSearchParams(location.search);
    if (searchParam.has('postName'))
      this.setState({ postName: searchParam.get('postName') });
  }

  handleChange = e => {
    const postName = e.target.value;
    this.setState({ postName });
  };

  handleSearch = postName => {
    const { searchPostName } = this.props;
    searchPostName(postName);
  };

  handleKeyPress = e => {
    const { history } = this.props;
    if (e.key === 'Enter') {
      this.handleSearch(e.target.value);
      history.replace(`/search?postName=${e.target.value}`);
    }
  };

  render() {
    const { postName } = this.state;

    return (
      <div className="search-bar">
        <div className="search-form">
          <Link
            to={`/search?postName=${postName}`}
            onClick={() => this.handleSearch(postName)}
          >
            <i className="fas fa-search" />
          </Link>
          <input
            name="postName"
            type="text"
            placeholder="Type any keyword..."
            value={postName}
            onChange={e => this.handleChange(e)}
            onKeyPress={e => this.handleKeyPress(e)}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  location: PropTypes.object,
  searchPostName: PropTypes.func,
  history: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    searchPostName: postName => dispatch(actionSearch.searchPostName(postName)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
