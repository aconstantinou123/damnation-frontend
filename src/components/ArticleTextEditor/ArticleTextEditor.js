import { useState, createRef } from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js'
import './ArticleTextEditor.css'
import 'draft-js/dist/Draft.css'

const ArticleTextEditor = ({ articleContent, saveArticleContent }) => {

  const initialState = articleContent 
    ? EditorState.createWithContent(convertFromRaw(articleContent))
    : EditorState.createEmpty()
  
  const editorRef = createRef()
  const [editorState, setEditorState] = useState(initialState)

  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ]

  const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ]

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor'
  let contentState = editorState.getCurrentContent()
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += 'RichEditor-hidePlaceholder'
    }
  }

  const focus = () => {
    editorRef.current.focus()
  }

  const onChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent()
    saveArticleContent(convertToRaw(contentState))
    return setEditorState(newEditorState)
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return true
    }
    return false
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      )
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  const toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    )
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    )
  }

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote'
      default: return null
    }
  }

  const StyleButton = (props) => {
    const onToggle = (e) => {
      e.preventDefault()
      props.onToggle(props.style)
    }

    let className = 'RichEditor-styleButton'
    if (props.active) {
      className += ' RichEditor-activeButton'
    }
    return (
      <span className={className} onMouseDown={onToggle}>
        {props.label}
      </span>
    )
  }
  
  const BlockStyleControls = (props) => {
    const { editorState } = props
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  
    return (
      <div className='RichEditor-controls'>
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
  
  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    
    return (
      <div className='RichEditor-controls'>
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
  

  return (
    <div className='editor-container'>
    <div className='RichEditor-root'>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder='Tell a story...'
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
    </div>
  )

}

export default ArticleTextEditor