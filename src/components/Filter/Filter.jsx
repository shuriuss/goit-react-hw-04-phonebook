import PropTypes from 'prop-types'
import s from './Filter.module.css'



function Filter (props) {
  const {onChange, value} = props
      return (
<>
<div className={s.filter}>
  <h3 className={s.title}>Find contacts by name</h3>
  <input
    onChange={onChange}
    value = {value}
    className={s.input}
  />
  </div>
</>
  )

  }

  Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }



export default Filter