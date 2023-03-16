import React from 'react'
import { connectAdvanced } from 'react-redux'

import { withStyles } from '@material-ui/core'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import DeleteIcon from '@material-ui/icons/Delete'
import AppBar from '@material-ui/core/AppBar/index'
import Tabs from '@material-ui/core/Tabs/index'
import Tab from '@material-ui/core/Tab/index'

import ConfirmButton from '../../../ConfirmButton'
import StudyPart from './StudyPart'
import actions from '../../../../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#025590'
  }
})

const connector = (dispatch, factoryOptions) => {
  let res = null
  const _actions = actions(dispatch)
  let previousProps = {}

  return (state, ownProps) => {
    const part = state.parts.currentChild ? state.parts.objects[state.parts.currentChild] : null

    if (state.parts.creating) {
      if (
        res &&
        res.partCreating &&
        state.parts.creating.loading === false &&
        state.parts.creating.object
      ) {
        _actions.updateStudy({
          parts: [...state.study.object.parts, state.parts.creating.object.id]
        })
        _actions.selectPartsChild(state.parts.creating.object)
      }
    }
    if (
      res === null ||
      res.study !== state.study.object ||
      res.part !== part ||
      res.partCreating !== (state.parts.creating ? state.parts.creating.loading : false) ||
      previousProps !== ownProps
    ) {
      previousProps = ownProps
      res = {
        study: state.study.object,
        part: part,
        partCreating: state.parts.creating ? state.parts.creating.loading : false,
        ..._actions,
        ...ownProps
      }
    }
    return res
  }
}

const StudyParts = withStyles(styles)(
  connectAdvanced(connector)(
    ({
      brickParams,
      getBrickParams,
      classes,
      partGroup,
      study,
      parts,
      selectPartsChild,
      createParts,
      part,
      updateStudy,
      deleteParts
    }) => (
      <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
        <AppBar position="static" className={classes.root}>
          <Tabs
            onChange={(_, partId) => {
              if (partId === null) createParts({ studyId: study.id }, { group: partGroup })
              else selectPartsChild(partId)
            }}
            value={(part && part.group.id === partGroup.id && part.id) || null}
          >
            {parts.map(p => (
              <Tab
                key={p.id}
                value={p.id}
                label={`Part ${p.index + 1}`}
                icon={
                  p.index !== 0 &&
                  part &&
                  part.id === p.id &&
                  partGroup.editable &&
                  study.editable ? (
                    <ConfirmButton
                      customButton={DeleteIcon}
                      popUpText="Are you sure you want to delete this study part ?"
                      onClick={e => {
                        e.stopPropagation()
                        selectPartsChild()
                        updateStudy({
                          parts: study.parts.filter(partId => partId !== p.id)
                        })
                        deleteParts({
                          studyId: study.id,
                          id: p.id
                        })
                      }}
                    />
                  ) : null
                }
              />
            ))}
            {study.editable && partGroup.editable && <Tab label={`Create new Part`} value={null} />}
          </Tabs>
        </AppBar>
        {part && part.group.id === partGroup.id && (
          <StudyPart partGroup={partGroup} getBrickParams={getBrickParams} />
        )}
      </ExpansionPanelDetails>
    )
  )
)

export default StudyParts
