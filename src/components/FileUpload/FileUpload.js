import './FileUpload.css'

const FileUploadPage = ({ 
  setFileUploaded,
  articleFileUploaded,
  selectedFile,
	articleFileSubmitting,
 }) => {

	const changeHandler = (event) => {
		setFileUploaded(event.target.files[0])
	}

	return(
   <div>
		 {
			 !articleFileSubmitting
			 ? <>
					<label htmlFor='file-upload' className='custom-file-upload'>
					Choose file
					</label>
					<input id='file-upload' type='file' name='damnation-file' onChange={changeHandler} />
			 </>
			 : <></>
		 }
			{(articleFileUploaded && selectedFile) ? (
				<div>
					<p className='file-details'>Filename: {selectedFile.name}</p>
					<p className='file-details'>Filetype: {selectedFile.type}</p>
				</div>
			) : (
				<p className='file-details'>Select a file to show details</p>
			)}
		</div>
	)
}

export default FileUploadPage