import {
  Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

import {
  APP_URL
} from './constants/types'

import LandingPage from './containers/LandingPage/LandingPage'
import About from './containers/About/About'
import Article from './containers/Article/Article'
import CreateArticle from './containers/CreateArticle/CreateArticle'
import EditArticle from './containers/EditArticle/EditArticle'
import Login from './containers/Login/Login'
import Logout from './containers/Logout/Logout'
import Submissions from './containers/Submissions/Submissions'
import PrivateRoute from './routes/PrivateRoute'
import Archive from './containers/Archive/Archive'
import ArchiveArticles from './containers/ArchiveArticles/ArchiveArticles'
import EditContent from './containers/EditContent/EditContent'
import Search from './containers/Search/Search'

import history from './history'
import store from './store'

import { persistLogin } from './actions/userActions'

import './App.css'

store.dispatch(persistLogin())

const damnationTitle = 'Damnation'
const damnationDescription = 'live, laugh, love'
const damnationLogoPath = `${APP_URL}/assets/damnation.png`

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Helmet>
              <title>{damnationTitle}</title>
              <meta name="Description" content={damnationDescription}/>
              <meta property="og:title" content={damnationTitle}/>
              <meta property="og:description" content={damnationDescription}/>
              <meta property="og:image" itemProp="image" content={damnationLogoPath}/>
              <meta property="og:url" content={history.location.href}/>
              <meta property="og:type" content="website"/>
              <meta name="twitter:card" content="summary_large_image"/>
              <meta name="twitter:title" content={damnationTitle}/>
              <meta name="twitter:description" content={damnationDescription}/>
              <meta name="twitter:image" content={damnationLogoPath}/>
        </Helmet>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/submissions' component={Submissions}/>
          <Route path='/content/:id' component={EditContent}/>
          <Route path='/archive/:date' component={ArchiveArticles}/>
          <Route path='/archive' component={Archive}/>
          <Route path='/search/:search' component={Search}/>
          <PrivateRoute path='/create' component={CreateArticle}/>
          <PrivateRoute path='/edit/:id' component={EditArticle}/>
          <Route path='/article/:id' component={Article}/>
          <Route path='/about' component={About}/>
          <Route path='/' component={LandingPage}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
