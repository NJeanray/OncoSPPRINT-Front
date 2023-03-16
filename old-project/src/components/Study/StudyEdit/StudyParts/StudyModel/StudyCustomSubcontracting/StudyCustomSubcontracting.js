import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index'
import AppBar from '@material-ui/core/AppBar/index'
import Tabs from '@material-ui/core/Tabs/index'
import Tab from '@material-ui/core/Tab/index'

import TabContent from './TabContent'

export const getCustomSubcontractingsUrl = {
  customTasks: 'custom-tasks',
  customConsumables: 'custom-consumables',
  subcontractings: 'subcontractings'
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
})

class StudyCustomSubcontracting extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Custom Tasks" />
            <Tab label="Custom Consumables" />
            <Tab label="Subcontracting" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <TabContent type="customTasks" name="custom task" {...this.props} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <TabContent type="customConsumables" name="custom consumable" {...this.props} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <TabContent type="subcontractings" name="subcontracting" {...this.props} />
          </TabContainer>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(StudyCustomSubcontracting)
