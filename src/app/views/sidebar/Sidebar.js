import List from '@material-ui/core/List'
import ProjectIcon from '@material-ui/icons/ScatterPlot'
import CustomSpinner from 'app/components/customSpinner'
import ProjectState from 'app/components/projectState'
import StudyRow from 'app/views/sidebar/studyRow'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ProjectItemType } from 'flow-typed/myLibDef'
import { HeaderSidebar, LiStyled, Wrapper } from './Sidebar.styled'

type Props = {
  partsSideBar: Array<{ id: number, name: string, type: string }>,
  studiesSideBar: Array<{ id: number, name: string, type: string }>,
  projectSelected: ProjectItemType
}

const Sidebar = ({
  partsSideBar,
  studiesSideBar,
  projectSelected,
  isStudiesLoading,
  isPartsLoading
}: Props) => {
  const { projectId, studyId } = useParams()

  return (
    <Wrapper>
      <List>
        <LiStyled isSelected={!studyId}>
          <Link to={`/projects/${projectId}`}>
            <HeaderSidebar>
              <ProjectIcon />
              <div className="project__title">{projectSelected.get('project_code')}</div>
              <ProjectState state={projectSelected.get('state')} />
            </HeaderSidebar>
          </Link>
        </LiStyled>
        {!isStudiesLoading &&
          studiesSideBar.map(studySideBar => (
            <StudyRow
              key={studySideBar.id}
              studySideBar={studySideBar}
              partsSideBar={partsSideBar}
              isPartsLoading={isPartsLoading}
            />
          ))}
        {isStudiesLoading && <CustomSpinner type="pulse" size={25} />}
      </List>
    </Wrapper>
  )
}

export default Sidebar
