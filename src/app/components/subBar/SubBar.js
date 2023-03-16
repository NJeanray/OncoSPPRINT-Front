import React from 'react'
import { FormattedMessage } from 'react-intl'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import { Wrapper } from 'app/components/subBar/SubBar.styled'
import TabPanel from 'app/components/tabPanel'
import BarAddBtn from './barAddBtn'

const SubBar = ({ tabs, btnAdd, children }) => {
  const [tabValue, setTabValue] = React.useState(0)
  const theme = useTheme()

  return (
    <Wrapper>
      <AppBar position="relative" color="default" className="tabs-wrapper__app-bar">
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map(tab => {
            return (
              <Tab key={tab} label={<FormattedMessage id={tab} style={{ height: '56px' }} />} />
            )
          })}
        </Tabs>
        {btnAdd && (
          <BarAddBtn
            disabledBtn={btnAdd.disabledBtn}
            handleClick={btnAdd.handleClickBtnAdd}
            text={btnAdd.text}
          />
        )}
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabValue}
        style={{ height: 'calc(100% - 48px)', padding: '32px' }}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => {
            return (
              <TabPanel value={tabValue} index={index} dir={theme.direction} key={index}>
                {child}
              </TabPanel>
            )
          })
        ) : (
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            {children}
          </TabPanel>
        )}
      </SwipeableViews>
    </Wrapper>
  )
}

export default SubBar
