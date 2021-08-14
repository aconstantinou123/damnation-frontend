import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from "./containers/LandingPage/LandingPage"
import About from "./containers/About/About"
import Article from "./containers/Article/Article"

import history from "./history";

import './App.css'

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/article/:id">
          <Article />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
