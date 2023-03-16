import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import Snackbar from '@material-ui/core/Snackbar/index'
import IconButton from '@material-ui/core/IconButton/index'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Fab from '@material-ui/core/Fab/index'
import AddIcon from '@material-ui/icons/Add'
import Table from '@material-ui/core/Table/index'
import TableBody from '@material-ui/core/TableBody/index'
import TableCell from '@material-ui/core/TableCell/index'
import TableFooter from '@material-ui/core/TableFooter/index'
import TableHead from '@material-ui/core/TableHead/index'
import TablePagination from '@material-ui/core/TablePagination/index'
import TableRow from '@material-ui/core/TableRow/index'
import Paper from '@material-ui/core/Paper/index'
import { withStyles } from '@material-ui/core/styles/index'

import Spinner from 'app/components/Spinner'
import { FormError } from 'app/components/Form'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#025590',
    // backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const CustomFab = withStyles(theme => ({
  root: {
    marginTop: -5,
    float: 'right',
    backgroundColor: '#3397de',
    // backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}))(Fab)

const StudyListElem = props => {
  const { id, title, site, client, owner } = props.study

  return (
    <TableRow
      hover
      classes={{ root: 'study-row' }}
      onClick={() => props.history.push(`/study/${id}`)}
    >
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell>{site && site.name}</TableCell>
      <TableCell>{client.nom_client}</TableCell>
      <TableCell>
        {owner.first_name} {owner.last_name}
      </TableCell>
      <TableCell align="right" />
    </TableRow>
  )
}

class StudiesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 12,
      isSnackbarOpen: props.notification
    }
  }

  newStudy = () => this.props.history.push('/new-study')

  componentWillMount() {
    this.props.getStudies({ limit: this.state.rowsPerPage })
  }

  handleChangePage = (_, page) => {
    this.setState({ page })
    if ((1 + page) * this.state.rowsPerPage > this.props.studies.objects.length)
      this.props.getStudies({
        limit: this.state.rowsPerPage,
        offset: this.props.studies.objects.length
      })
  }

  handleCloseSnackbar = () => {
    this.setState({ isSnackbarOpen: false })
    this.props.setNotification(null)
  }

  renderStudyListElem = study => (
    <StudyListElem key={study.id} study={study} history={this.props.history} />
  )

  render() {
    const { isSnackbarOpen } = this.state
    const { notification } = this.props

    return (
      <Fragment>
        <Paper classes={{ root: 'paper-root' }}>
          <h1>
            <CustomFab variant="extended" aria-label="Add" onClick={this.newStudy}>
              <AddIcon />
              <FormattedMessage id="Create Study" />
            </CustomFab>
            <FormattedMessage id="Studies" />
          </h1>
          <div className="paper-root-fullwidth">
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>
                    <FormattedMessage id="Name" />
                  </CustomTableCell>
                  <CustomTableCell>
                    <FormattedMessage id="Site" />
                  </CustomTableCell>
                  <CustomTableCell>
                    <FormattedMessage id="Client" />
                  </CustomTableCell>
                  <CustomTableCell>
                    <FormattedMessage id="Owner" />
                  </CustomTableCell>
                  <CustomTableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.studies.objects
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
                  )
                  .map(this.renderStudyListElem)}
                {this.props.studies.loading && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Spinner>Loading...</Spinner>
                    </TableCell>
                  </TableRow>
                )}
                {this.props.studies.errors && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      {(this.props.studies.errors.map &&
                        this.props.studies.errors.map(FormError)) ||
                        FormError(this.props.studies.errors)}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[12]}
                    colSpan={5}
                    count={this.props.studies.totalCount || 0}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    SelectProps={{
                      native: true
                    }}
                    onChangePage={this.handleChangePage}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page'
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <Snackbar
          className="snack-bar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={isSnackbarOpen}
          autoHideDuration={5000}
          onClose={() => this.handleCloseSnackbar()}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id" className="snack-bar__content">
              <CheckCircleIcon className="content__icon" />
              {notification && <span>{notification}</span>}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.handleCloseSnackbar()}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Fragment>
    )
  }
}

export default StudiesList
