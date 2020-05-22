import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './css/App.css';
import Navbar from './components/Navbar';
import LoginPanel from './components/login/LoginPanel';
import Display from './components/Display';
import ArticleMain from "./components/article/Main";
import NewArticle from "./components/new/NewArtl";
import { withCookies } from 'react-cookie';
import SingleArticle from "./components/article/SingleArticle";
import {
    Provider as KeepAliveProvider,
    KeepAlive
} from 'react-keep-alive';

function App() {
  return (
      <Router>
          <KeepAliveProvider>
              <div>
                  <Navbar/>
                  <br/>
                  <LoginPanel/>
                  <Switch>
                      <Route path="/" exact>
                          <KeepAlive name="ArticleMain">
                              <ArticleMain />
                          </KeepAlive>
                      </Route>
                      <Route path="/favorite">
                          <Display />
                      </Route>
                      <Route path="/new-article">
                          <NewArticle />
                      </Route>
                      <Route path="/single-article/:articleId">
                          <SingleArticle />
                      </Route>
                  </Switch>
              </div>
          </KeepAliveProvider>
      </Router>

  );
}

export default withCookies(App);
