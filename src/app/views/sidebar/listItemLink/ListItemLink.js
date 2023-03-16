import React from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
import { LiStyled } from 'app/views/sidebar/Sidebar.styled'

function ListItemLink({ to, open, lvlNested, nameDisplayed, isSelected, onClick }) {
  return (
    <LiStyled lvlNested={lvlNested} isSelected={isSelected}>
      <ListItem button component={RouterLink} to={to} onClick={onClick}>
        <ListItemText primary={nameDisplayed} />
        {/* eslint-disable-next-line no-nested-ternary */}
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </LiStyled>
  )
}

ListItemLink.defaultProps = {
  open: null
}

export default ListItemLink
