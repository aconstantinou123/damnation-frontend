import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux'

import LandingPage from './containers/LandingPage/LandingPage'
import About from './containers/About/About'
import Article from './containers/Article/Article'
import CreateArticle from './containers/CreateArticle/CreateArticle'
import EditArticle from './containers/EditArticle/EditArticle'

import history from './history'
import store from './store'

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/create'>
            <CreateArticle/>
          </Route>
          <Route path='/edit/:id'>
            <EditArticle/>
          </Route>
          <Route path='/article/:id'>
            <Article />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
