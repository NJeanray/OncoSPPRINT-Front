import Fab from '@material-ui/core/Fab/index'
import { withStyles } from '@material-ui/core/styles/index'

export default withStyles(theme => ({
  root: {
    height: 'unset !important',
    padding: '12px',
    marginTop: -5,
    float: 'right',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}))(Fab)
