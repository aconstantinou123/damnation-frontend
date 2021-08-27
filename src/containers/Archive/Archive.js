import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArchiveView from '../../components/ArchiveView/ArchiveView'

import * as archiveActionCreators from '../../actions/archiveActions'

import './Archive.css';

const Archive = ({ 
  archiveDatesFetched,
  fetchArchiveDates,
  archiveDates,
  user,
}) => {

  useEffect(() => {
    fetchArchiveDates()
  }, [fetchArchiveDates])

  return (
    <div className='archive-container'>
      {
        archiveDatesFetched
        ? <ArchiveView
            archiveDates={archiveDates}
            user={user}
          />
        : <div>Loading...</div>
      }
      
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...archiveActionCreators,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.archiveReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
