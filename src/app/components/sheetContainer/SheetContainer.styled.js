import styled, { css } from 'styled-components'
import Paper from '@material-ui/core/Paper'

const ProjectDashboardWrapper = styled(Paper)`
  ${({ theme: { colors, fontSize } }) => css`
    padding: 80px;
    width: ${props => (props.width ? props.width : 'fit-content')};
    position: relative;

    .sheet-container__rectangle {
      position: absolute;
    }

    .sheet-container__left-rectangle {
      width: 12px;
      height: 80px;
      top: 30px;
      left: -6px;
      background-color: ${colors['purple-color']};
    }

    .sheet-container__top-rectangle {
      width: 100%;
      height: 12px;
      top: 0;
      left: 0;
      background-color: ${colors['turquoise-color']};
    }
  `}
`

export default ProjectDashboardWrapper
