import './Title.css'
import history from '../../history'



const Title = () => (
  <div className='title' onClick={() => history.push('/')}>
    <div className='title-container'>
      <h1>Damnation</h1>
      <img src='/assets/damnation.png' alt='Damnation logo'/>
    </div>
   </div>
)

export default Title