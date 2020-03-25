import React, { Component } from 'react';
import PaginationComp from '../components/Pagination';
import SearchBarComp from '../components/SearchBar';
import CategoriesComp from '../components/Categories';
import PopularArticleComp from '../components/PopularArticle';
import HashTagComp from '../components/HaskTag';
import NewsLetterComp from '../components/NewsLetter';
import ArticleTravel from '../components/ArticleTravel';

class Travel extends Component {
  render() {
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

export default Travel;
