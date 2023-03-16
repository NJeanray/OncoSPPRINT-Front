// @flow
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import PreviousPage from '@material-ui/icons/ArrowLeft'
import NextPage from '@material-ui/icons/ArrowRight'

type Props = {
  handlePrevList: () => void,
  handleNextList: () => void,
  firstPage: boolean
}

const ProjectListTableNavBtn = ({ handlePrevList, handleNextList, firstPage = false }: Props) => {
  return (
    <div className="projects-list__table-nav-btn">
      {!firstPage && (
        <IconButton onClick={handlePrevList}>
          <PreviousPage />
        </IconButton>
      )}
      <IconButton onClick={handleNextList}>
        <NextPage />
      </IconButton>
    </div>
  )
}

export default ProjectListTableNavBtn
