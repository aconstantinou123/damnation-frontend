import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArchiveView from '../../components/ArchiveView/ArchiveView'

import * as archiveActions from '../../actions/archiveActions'
import * as articleActions from '../../actions/articleActions'

import './Archive.css';

const Archive = ({ 
  archiveDatesFetched,
  fetchArchiveDates,
  archiveDates,
  user,
  setCurrentPage,
}) => {

  useEffect(() => {
    fetchArchiveDates()
  }, [fetchArchiveDates])

  useEffect(() => {
    setCurrentPage(1)
  }, [setCurrentPage])

  return (
    <div className='archive-container'>
      <ArchiveView
        archiveDates={archiveDates}
        user={user}
        archiveDatesFetched={archiveDatesFetched}
      />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...archiveActions,
      ...articleActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.archiveReducer,
    ...state.userReducer,
    ...state.articleReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
