import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar">
        <div className="search-form">
          <i className="fas fa-search" />
          <input type="text" placeholder="Type any keyword..." />
        </div>
      </div>
    );
  }
}

export default SearchBar;
