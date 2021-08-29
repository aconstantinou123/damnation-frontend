import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import "./EditContent.css";

import ContentForm from '../../components/ContentForm/ContentForm'

import * as contentActions from '../../actions/contentActions'

const EditContent = ({ 
  saveContentTitle,
  saveContentText,
  submitEditContent,
  contentToEdit,
  resetContentState,
  contentError,
}) => {
  return (
    <div className="edit-content-container">
      <ContentForm
        formName='Edit Content'
        resetContentState={resetContentState}
        saveContentTitle={saveContentTitle}
        saveContentText={saveContentText}
        submitContent={submitEditContent}
        content={contentToEdit}
        contentError={contentError}
      />
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
    ...state.contentReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContent)

