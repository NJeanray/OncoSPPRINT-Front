import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const getStudySupervisions = state => {
  return state.data.get('studySupervisions')
}

export const getStudySupervisionsSelector = createSelector(
  [getStudySupervisions],
  studySupervisions => studySupervisions?.get('data')
)

export const getStudySupervisionsTable = createSelector(
  [getStudySupervisionsSelector],
  studySupervisions => {
    if (!studySupervisions || studySupervisions?.size === 0) return []

    const studySupervisionsTable = studySupervisions.valueSeq().map(studySupervision => ({
      id: studySupervision.get('id'),
      type: studySupervision.get('type'),
      workers: studySupervision.get('workers').toJS()
      // workers: studySupervision.get('workers')
      //   ? studySupervisions
      //       .get('workers')
      //       .toJS()
      //       .map(worker => ({
      //         workingTime: worker.working_time,
      //         workerTitle: worker.job_title,
      //         mspLaboratoryName: worker.labo_msp_name,
      //         mspLaboratoryId: worker.labo_msp_id
      //       }))
      //   : []
    }))
    return sortBy(studySupervisionsTable.toJS(), [
      studySupervision => studySupervision.id
    ]).reverse()
  }
)
