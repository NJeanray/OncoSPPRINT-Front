import React from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import StyledTable from 'app/components/styledTable'

const CustomConsumablesListTable = ({
  disabledBtn,
  handleModify,
  handleDelete,
  customConsumablesTable
}) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">
            {<FormattedMessage id="customConsumable.consumable" />}
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="consumable.provider" />
          </TableCell>
          <TableCell align="left">{<FormattedMessage id="customConsumable.cost" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="customConsumable.description" />}
          </TableCell>
          <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(customConsumablesTable) &&
          customConsumablesTable.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.consumableLibelleArticle}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.provider}
              </TableCell>
              <TableCell align="left">{row.cost}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">
                {!disabledBtn && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleModify(row.id)}
                      style={{ padding: '10px', marginRight: '10px' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
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
  )
}

export default CustomConsumablesListTable
