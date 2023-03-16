import styled from 'styled-components'
import Box from '@material-ui/core/Box'

const StudyFormButtonsWrapper = styled(Box)`
  .MuiGrid-container {
    & > div {
      margin-top: 20px;
    }

    & > div:nth-child(1),
    div:nth-child(3) {
      padding-right: 20px;
    }

    & > div:nth-child(2),
    div:nth-child(4) {
      padding-left: 20px;
    }
  }
`

export default StudyFormButtonsWrapper
