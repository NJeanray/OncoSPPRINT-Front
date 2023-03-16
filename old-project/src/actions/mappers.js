const getCurrentPart = state =>
  state.parts.currentChild ? state.parts.objects[state.parts.currentChild] : null
const getCurrentStudyModel = (state, part = getCurrentPart(state)) =>
  state.study_models.currentChild && part.study_models.indexOf(state.study_models.currentChild) >= 0
    ? state.study_models.objects[state.study_models.currentChild]
    : null

export const studyModelMapper = state => {
  return {
    studyModel: getCurrentStudyModel(state)
  }
}

export const initialGroupMapper = (state, ownProps) => {
  const studyModel = getCurrentStudyModel(state)

  return {
    groups: state.groups.objects,
    group:
      studyModel && !ownProps.groupInfos
        ? state.groups.objects[studyModel.initial_group]
        : ownProps.groupInfos,
    isFetching: state.groups.isFetching ? state.groups.isFetching : false,
    study: state.study.object,
    studyModel: getCurrentStudyModel(state)
  }
}
