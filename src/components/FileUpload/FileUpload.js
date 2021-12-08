import './FileUpload.css'

const FileUploadPage = ({ 
  setFileUploaded,
  articleFileUploaded,
  selectedFile,
 }) => {

	const changeHandler = (event) => {
		setFileUploaded(event.target.files[0])
	}

	return(
   <div>
			<input type="file" name="damnation-file" onChange={changeHandler} />
			{articleFileUploaded ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		</div>
	)
}

export default FileUploadPage