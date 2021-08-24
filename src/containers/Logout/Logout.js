import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../../actions/userActions'

const Logout = ({ logout }) => {
  
  useEffect(() => {
    logout()
  },[logout])

  return <h3>Logging out now...</h3>
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...userActions,
    },
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
