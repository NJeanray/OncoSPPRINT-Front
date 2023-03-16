import React, { useState } from 'react'

import SubBar from 'app/components/subBar'
import CreateStudy from 'app/views/createStudy'
import ManageProject from './projectTabs/manageProject'
import CostingDocument from './projectTabs/costingDocument'

const CategoryProject = ({ projectSelected }) => {
  const [openCreateStudyModal, setOpenCreateStudyModal] = useState(false)

  return (
    <>
      <SubBar
        tabs={['projectCategory.project', 'projectCategory.costingDocument']}
        btnAdd={{
          handleClickBtnAdd: () => setOpenCreateStudyModal(true),
          text: 'projectCategory.appBarAddBtn'
        }}
      >
        <ManageProject
          projectSelected={projectSelected}
          openCreateStudyModal={openCreateStudyModal}
        />
        <CostingDocument projectSelected={projectSelected} />
      </SubBar>
      <CreateStudy
        projectSite={projectSelected.get('site')}
        open={openCreateStudyModal}
        onClose={() => setOpenCreateStudyModal(false)}
      />
    </>
  )
}

export default CategoryProject
