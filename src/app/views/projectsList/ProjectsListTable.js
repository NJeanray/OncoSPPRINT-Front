// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import StyledTable from 'app/components/styledTable'
import ProjectState from 'app/components/projectState'
import { RouterHistory } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'

type Project = {
  id: number,
  name: String,
  state: String,
  site: String,
  client: String,
  creation_date: String,
  code: String,
  owner: String
}

type Props = {
  projectsTable: Array<Project>,
  history: RouterHistory
}

const ProjectsListTable = ({ projectsTable, history }: Props) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>
            <FormattedMessage id="projectsList.creationDate" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="projectsList.projectCode" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="projectsList.projectTitle" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="projectsList.projectState" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="projectsList.client" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="projectsList.site" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="projectsList.owner" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {projectsTable.map(row => {
          return (
            <TableRow key={row.id} onClick={() => history.push(`/projects/${row.id}/`)}>
              <TableCell component="th" scope="row">
                {moment(row.creation_date).format('L')}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">
                <ProjectState state={row.state} />
              </TableCell>
              <TableCell align="left">{row.client}</TableCell>
              <TableCell align="left">{row.site}</TableCell>
              <TableCell align="left">{row.owner}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </StyledTable>
  )
}

export default ProjectsListTable
