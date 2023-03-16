import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List'
import { isEmpty } from 'lodash'
import CustomSpinner from 'app/components/customSpinner'
import Collapse from '@material-ui/core/Collapse'
import ListItemLink from 'app/views/sidebar/listItemLink'
import { useParams } from 'react-router-dom'

const StudyRow = ({ studySideBar, partsSideBar, isPartsLoading }) => {
  const { projectId, studyId, partId } = useParams()
  const [open, setOpen] = React.useState(studySideBar.id.toString() === studyId)
  const baseUrl = `/projects/${projectId}/study/${studySideBar.id}`

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen)
  }

  React.useEffect(() => {
    setOpen(studySideBar.id.toString() === studyId)
  }, [studyId, studySideBar])

  const displayPartsSideBar = () => {
    if (!open || isEmpty(partsSideBar)) return null

    return partsSideBar.map(partSideBar => {
      if (partSideBar.study_id !== studySideBar.id) return null

      return (
        <Collapse key={partSideBar.id} component="li" in={open}>
          <Tooltip title={partSideBar.type} placement="right">
            <List disablePadding>
              <ListItemLink
                to={`${baseUrl}/part/${partSideBar.id}`}
                nameDisplayed={partSideBar.name}
                lvlNested={1}
                isSelected={partSideBar.id.toString() === partId}
              />
            </List>
          </Tooltip>
        </Collapse>
      )
    })
  }

  return (
    <React.Fragment key={studySideBar.id}>
      <Tooltip title={studySideBar.type} placement="right">
        <List disablePadding>
          <ListItemLink
            to={baseUrl}
            open={open}
            onClick={handleClick}
            nameDisplayed={studySideBar.name}
            isSelected={studySideBar.id.toString() === studyId && !partId}
          />
        </List>
      </Tooltip>
      {!isPartsLoading && displayPartsSideBar()}
      {isPartsLoading && studyId === studySideBar.id.toString() && (
        <CustomSpinner type="pulse" size={25} />
      )}
    </React.Fragment>
  )
}

export default StudyRow
