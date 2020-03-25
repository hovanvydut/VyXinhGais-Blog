import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogoComp from '../components/Logo';
import LoadingComp from '../components/Loading';
import MainMenuComp from '../components/MainMenu';
import SubscribeForm from '../components/SubscribeForm';
import Home from './Home';
import Fashion from './Fashion';
import Travel from './Travel';
import Post from './Post';
import Error from './Error';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div className="toggle-menu">
            <div />
            <div />
            <div />
          </div>

          <header>
            <MainMenuComp />
            <LogoComp />
            <SubscribeForm />
          </header>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/fashion" component={Fashion} />
            <Route path="/travel.html" component={Travel} />
            <Route path="/post/:linkPost" component={Post} />
            <Route path="/error" component={Error} />
            <Route path="*" component={Error} />
          </Switch>
          <LoadingComp />
        </Router>
      </>
    );
  }
}

export default App;
