import React, { useEffect, useState } from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'

import './ArticleContent.css'

const ArticleContent = ({ articleContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    const raw = convertFromRaw(articleContent)
    setEditorState(EditorState.createWithContent(raw))
  }, [articleContent])

  return (
    <div className="article-content">
      <Editor
        editorState={editorState}
        readOnly
      />
    </div>
  );
}

export default ArticleContent