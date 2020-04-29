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
import { CookiesProvider } from 'react-cookie';
import NewArticle from "./components/new/NewArtl";
import Demo from "./components/article/Demo";

function App() {
  return (
      <Router>
          <div>
              <CookiesProvider>
                  <Navbar/>
              </CookiesProvider>
              <LoginPanel/>
              <Switch>
                  <Route path="/" exact>
                      <ArticleMain />
                  </Route>
                  <Route path="/favorite">
                      <Display />
                  </Route>
                  <Route path="/new-article">
                      <NewArticle />
                  </Route>
                  <Route path="/clipper">
                  <Demo />
              </Route>
              </Switch>
          </div>
      </Router>

  );
}

export default App;
