import React from 'react'
import { FormattedMessage } from 'react-intl'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'
import LogoutIcon from '@material-ui/icons/KeyboardTab'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import Logo from 'app/assets/logo.png'
import logoutClearLocalStorage from 'app/utils/logoutClearLocalStorage'
import TopBarWrapper from './TopBar.styled'

const TopBar = ({ history, setResetStore }) => {
  const [isListOpen, setIsListOpen] = React.useState(false)
  const appRef = React.useRef()
  const user = JSON.parse(window.localStorage.getItem('user'))

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (appRef.current && !appRef.current.contains(event.target)) setIsListOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logoutClearLocalStorage()
    history.push('/')
    setResetStore()
  }

  if (!user) handleLogout()

  const userInitials =
    user.first_name && user.last_name
      ? user.first_name
          .charAt(0)
          .toUpperCase()
          .concat(user.last_name.charAt(0).toUpperCase())
      : user.username

  return (
    <TopBarWrapper>
      <AppBar position="static" ref={appRef}>
        <Toolbar>
          <img
            className="right-side__logo"
            src={Logo}
            alt="oncospprint-logo"
            onClick={() => history.push('/projects')}
          />
          <div className="top-bar__right-side" onClick={() => setIsListOpen(!isListOpen)}>
            <Avatar className="right-side__avatar">{userInitials}</Avatar>
            <Box ml={2} letterSpacing={3} className="right-side__user-name">
              {user && user.first_name && user.last_name
                ? `${user && user.first_name} ${user.last_name}`
                : `${user && user.username}`}
            </Box>
            <IconButton
              aria-label="keyboard-arrow-down"
              aria-controls="keyboard-arrow-down"
              aria-haspopup="true"
            >
              <ArrowDown color="primary" />
            </IconButton>
          </div>
        </Toolbar>
        {isListOpen && (
          <div className="top-bar__list-wrapper">
            <List component="menu" aria-label="main mailbox folders">
              <ListItem id="btn-logout" component="div" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <FormattedMessage id="topbar.logout" />
                </ListItemText>
              </ListItem>
            </List>
          </div>
        )}
      </AppBar>
    </TopBarWrapper>
  )
}

export default TopBar
