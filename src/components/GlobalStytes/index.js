import PropTypes from 'prop-types';
import './GlobalStytes.scss'

function GlobalStytes({ children }) {
  return children
}
GlobalStytes.propTypes = {
  children: PropTypes.node.isRequired
}
export default GlobalStytes
