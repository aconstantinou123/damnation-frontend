import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import './About.css';

// import CopyView from '../../components/CopyView/CopyView'
// import copy from './SubmissionCopy.json'


const About = ({ 
  // selectAboutToEdit,
  user,
}) => {

  console.log(user)
  return (
    <div className='about-container'>
      {
        true
        ? <h2>About</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
