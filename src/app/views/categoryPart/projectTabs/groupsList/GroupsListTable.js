import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import StyledTable from 'app/components/styledTable'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

import WarningModal from 'app/components/warningModal'

const GroupsListTable = ({ disabledBtn, handleDelete, handleModify, groupsTable }) => {
  const [openDeleteWarningModal, setOpenDeleteWarningModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  return (
    <>
      <WarningModal
        open={openDeleteWarningModal}
        onClose={() => setOpenDeleteWarningModal(false)}
        onCancel={() => setOpenDeleteWarningModal(false)}
        onSubmit={() => {
          handleDelete(idToDelete)
          setOpenDeleteWarningModal(false)
        }}
        warningText="groups.warning.deleteG0.text"
        warningTitle="groups.warning.deleteG0.title"
      />
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage id="group.name" />
            </TableCell>
            <TableCell align="left">
              <FormattedMessage id="group.nbAnimals" />
            </TableCell>
            <TableCell align="left">
              <FormattedMessage id="table.actions" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(groupsTable) &&
            groupsTable.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.nbAnimals}</TableCell>
                <TableCell align="left">
                  {!disabledBtn && (
                    <>
                      <IconButton
                        onClick={() => handleModify(row.id)}
                        size="small"
                        style={{ padding: '10px', marginRight: '10px' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (row.name.toLowerCase() === 'g0') {
                            setIdToDelete(row.id)
                            setOpenDeleteWarningModal(true)
                          } else handleDelete(row.id)
                        }}
                        size="small"
                        style={{ padding: '10px' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </>
  )
}

export default GroupsListTable
