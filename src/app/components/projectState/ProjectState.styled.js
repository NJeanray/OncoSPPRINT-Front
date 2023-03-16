import styled, { css } from 'styled-components'

const ProjectStateWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    display: flex;
    align-items: center;

    .project__state-circle {
      width: 12px;
      height: 12px;
      border-radius: 45px;
      margin-right: 10px;
    }

    .project__state-circle--submitted {
      background-color: ${colors['orange-color']};
    }

    .project__state-circle--refused {
      background-color: ${colors['red-color']};
    }

    .project__state-circle--accepted {
      background-color: ${colors['green-color']};
    }

    .project__state-circle--created {
      background-color: ${colors['turquoise-color']};
    }
  `}
`

export default ProjectStateWrapper
