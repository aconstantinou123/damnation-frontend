import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentView from '../../components/ContentView/ContentView'

import './Submissions.css'

import * as contentActions from '../../actions/contentActions'
import { useEffect } from 'react';


const Submissions = ({ 
  fetchContent,
  fetchedContent,
  content,
  user,
  setContentToEdit,
}) => {

  useEffect(() => {
    fetchContent()
  }, [fetchContent])
  const { submissions } = content
  return (
    <div className='submissions-page'>
      <div className='submissions-container'>
        <ContentView 
          content={submissions}
          fetchedContent={fetchContent}
          user={user}
          selectContentToEdit={setContentToEdit}
        />
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...contentActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.userReducer,
    ...state.contentReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submissions)
