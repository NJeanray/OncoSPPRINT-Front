import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default ({ animalsProvider }) => {
  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Animal souche libelle</TableCell>
              <TableCell align="right">Animal libelle completaire</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Sexe</TableCell>
              <TableCell align="right">Poids</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{animalsProvider.animaux_souche_libelle}</TableCell>
              <TableCell align="right">{animalsProvider.libelle_complementaire}</TableCell>
              <TableCell align="right">{animalsProvider.animaux_age_libelle}</TableCell>
              <TableCell align="right">{animalsProvider.animaux_sexe_libelle}</TableCell>
              <TableCell align="right">{animalsProvider.animaux_poids_libelle}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
