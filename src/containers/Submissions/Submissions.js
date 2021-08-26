import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import './Submissions.css';

import CopyView from '../../components/CopyView/CopyView'
import copy from './SubmissionCopy.json'


const Submissions = ({ 
  // selectSubmissionsToEdit,
  user,
}) => {


  return (
    <div className='submissions-container'>
      {
        true
        ? <CopyView 
            copy={copy}
            user={user}
            // selectSubmissionsToEdit={selectSubmissionsToEdit}
          />
        : <div>Loading...</div>
      }
      
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submissions)
