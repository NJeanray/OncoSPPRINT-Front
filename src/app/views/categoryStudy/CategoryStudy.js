import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CustomSpinner from 'app/components/customSpinner'
import CreatePart from 'app/views/createPart'
import SubBar from '../../components/subBar/SubBar'
import ManageStudy from './studyTabs/manageStudy'
import StudySupervisionsList from './studyTabs/studySupervisionsList'
import Documents from './studyTabs/documents'

const StudyCategory = ({ fetchStudies, projects, studies, history }) => {
  const { projectId, studyId } = useParams()
  const [openCreatePartModal, setOpenCreatePartModal] = useState(false)
  const [studySelected, setStudySelected] = useState(null)
  const [projectSelected, setProjectSelected] = useState(null)
  const projectSite = projects?.getIn([projectId.toString(), 'site'])
  const studyState = studySelected?.get('state')

  useEffect(() => {
    if (studies) setStudySelected(studies.get(studyId.toString()))
    if (projects) setProjectSelected(projects.get(projectId.toString()))
  }, [projects, studies, projectId, studyId])

  if (!studySelected) {
    return <CustomSpinner type="square" />
  }

  return (
    <>
      <SubBar
        tabs={[
          'studyCategory.tab.study',
          'studyCategory.tab.studySupervisions',
          'studyCategory.tab.documents'
        ]}
        btnAdd={{
          disabledBtn: studyState === 'amended',
          handleClickBtnAdd: () => setOpenCreatePartModal(true),
          text: 'studyCategory.appBarAddBtn'
        }}
      >
        <ManageStudy
          fetchStudies={fetchStudies}
          projectSelected={projectSelected}
          studySelected={studySelected}
          history={history}
          projectSite={projectSite}
        />
        <StudySupervisionsList
          projectId={projectId}
          studyId={studySelected.get('id')}
          studyState={studySelected.get('state')}
        />
        <Documents
          projectCode={projectSelected.get('project_code')}
          studyId={studySelected.get('id')}
          studyName={studyState}
        />
      </SubBar>
      <CreatePart
        projectSite={projectSite}
        projectId={projectId}
        studyId={studySelected.get('id')}
        open={openCreatePartModal}
        onClose={() => setOpenCreatePartModal(false)}
      />
    </>
  )
}

export default StudyCategory
