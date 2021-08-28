import { Link } from 'react-router-dom'

import Button from '../Button/Button'
import Header from '../Header/Header'
import Loading from '../../components/Loading/Loading'

import history from '../../history'

import './ArchiveView.css'

const ArchiveView = ({ 
  archiveDates,
  user,
  archiveDatesFetched,
}) => {
  const renderArchiveDates = () => {
    return archiveDates.map(date => {
      return <Link 
        key={date}
        className='link' 
        to={`/archive/${encodeURIComponent(date)}`}
        >{date}</Link>
    })
  }

  return (
    <div className="archive-view">
      <div className='archive-button-container'>
        <Header
          user={user}
        />
      </div>
      {
        archiveDatesFetched ? (
          <>
            <Button onClick={() => history.push('/')} name='Back'/>
            <div className='archive-dates'>
              {renderArchiveDates()}
            </div>
          </>
        ) : (
         <Loading/>
        )
      }
    </div>
  )
}

export default ArchiveView