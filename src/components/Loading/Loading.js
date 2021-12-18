import './Loading.css'

const Loading = ({ isSmall }) => {
  const loadingClass = isSmall ? 'loading-container-small' : 'loading-container'
  return (
    <div className={loadingClass}>
      <img className='loading-img' src='/assets/loading.gif' alt='loading'/>
    </div>
  )
}

export default Loading