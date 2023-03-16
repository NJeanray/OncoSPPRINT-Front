import styled from 'styled-components'
import Container from '@material-ui/core/Container'

export const ProjectsListWrapper = styled(Container)`
  margin-top: 40px;

  .projects-list__errors-wrapper {
    margin-top: 40px;
    width: 100%;
  }

  .projects-list__actions {
    display: flex;
    justify-content: flex-end;
  }

  .projects-list__table-nav-btn {
    float: right;
    margin-bottom: 100px;
  }
`
