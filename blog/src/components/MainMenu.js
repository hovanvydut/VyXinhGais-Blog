import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMenu: [
        {
          id: 1,
          name: 'Home',
          path: '/',
        },
        {
          id: 2,
          name: 'Blog',
          path: '/blog',
        },
        {
          id: 3,
          name: 'Travel',
          path: '/travel',
        },
        {
          id: 4,
          name: 'About',
          path: '/about.html',
        },
        {
          id: 5,
          name: 'Forum',
          path: '/forum',
        },
        {
          id: 6,
          name: 'Login',
          path: '/login',
        },
      ],
    };
  }

  showList = () => {
    const { listMenu } = this.state;

    const xhtml = [];
    listMenu.forEach(item => {
      xhtml.push(
        <li className="main-menu__item" key={item.id}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      );
    });
    return xhtml;
  };

  render() {
    return (
      <nav>
        <ul className="main-menu">{this.showList()}</ul>
      </nav>
    );
  }
}

export default withRouter(MainMenu);
