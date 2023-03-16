import { connect } from 'react-redux'
import CustomConsumableForm from './CustomConsumableForm'

const mapStateToProps = state => ({
  customConsumable: state.data.get('customConsumable')
})

export default connect(mapStateToProps)(CustomConsumableForm)
