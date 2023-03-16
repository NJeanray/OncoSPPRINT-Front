import React from 'react'
import { connectAdvanced } from 'react-redux'
import _ from 'lodash'

import AppBar from '@material-ui/core/AppBar/index'
import Tabs from '@material-ui/core/Tabs/index'
import Tab from '@material-ui/core/Tab/index'

import actions from '../../../../actions'
import StudyModel from './StudyModel/StudyModel'

const connector = (dispatch, factoryOptions) => {
  let res = null
  const _actions = actions(dispatch)

  return (state, ownProps) => {
    const part = state.parts.currentChild ? state.parts.objects[state.parts.currentChild] : null
    if (state.study_models.creating) {
      if (
        res &&
        res.studyModelCreating &&
        state.study_models.creating.loading === false &&
        state.study_models.creating.object
      ) {
        _actions.updateParts({
          study_models: [...part.study_models, state.study_models.creating.object.id]
        })
        _actions.selectStudy_modelsChild(state.study_models.creating.object)
        _actions.setNewStudyModelGroup(state.study_models.creating.object)
      }
    }
    if (
      res === null ||
      res.study !== state.study.object ||
      res.study_models !== part.study_models.map(modelId => state.study_models.objects[modelId]) ||
      res.studyModel !==
        (state.study_models.currentChild
          ? state.study_models.objects[state.study_models.currentChild]
          : null) ||
      res.studyModelCreating !==
        (state.study_models.creating ? state.study_models.creating.loading : false)
    ) {
      res = {
        part,
        brickParams: state.brickParams,
        bricks: state.bricks,
        study: state.study.object,
        studyModel: state.study_models.currentChild
          ? state.study_models.objects[state.study_models.currentChild]
          : null,
        study_models: part.study_models.map(modelId => state.study_models.objects[modelId]),
        allGroups: state.groups.objects,
        studyModelCreating: state.study_models.creating
          ? state.study_models.creating.loading
          : false,
        ..._actions
      }
    }
    return res
  }
}

const displayStudyModels = studyModel => (
  <Tab
    key={studyModel.id}
    value={studyModel.id}
    label={studyModel.modelName ? studyModel.modelName.name : `New Study Model`}
    style={{ textAlign: 'left' }}
  />
)

const StudyPart = props => {
  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static">
        <Tabs
          onChange={(_, studyModel) => {
            if (studyModel === null) {
              props.createStudy_models({
                studyId: props.study.id,
                partId: props.part.id
              })
            } else {
              props.selectStudy_modelsChild(studyModel)
            }
          }}
          value={props.studyModel && props.studyModel.id}
        >
          {props.study_models.map(displayStudyModels)}
          {props.part.editable && props.study.editable && (
            <Tab
              label={`Create new Study Model`}
              value={null}
              disabled={props.part.index !== 0 && props.studyModel && !props.studyModel.modelName}
            />
          )}
        </Tabs>
      </AppBar>
      {props.studyModel && !_.isEmpty(props.part.study_models) && (
        <StudyModel
          brickParams={props.brickParams}
          bricks={props.bricks}
          study={props.study}
          part={props.part}
          studyModel={props.studyModel}
          setStudy_modelsModel_type={props.setStudy_modelsModel_type}
          setStudy_modelsModelName={props.setStudy_modelsModelName}
          selectStudy_modelsChild={props.selectStudy_modelsChild}
          deleteStudy_models={props.deleteStudy_models}
          updateParts={props.updateParts}
          group={props.group}
          allGroups={props.allGroups}
          getBrickParams={props.getBrickParams}
          getBrickId={props.getBrickId}
          {...props}
        />
      )}
    </div>
  )
}

export default connectAdvanced(connector)(StudyPart)
