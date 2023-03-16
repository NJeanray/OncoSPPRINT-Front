import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const StudySupervisionsListWrapper = styled(Container)`
   margin-top: 40px;
    ${props =>
      props.fetching === 'true' &&
      `
        display: flex;
        justify-content: center;
        padding-top: 200px;
      `};
    
    .MuiToolbar-root {
      padding: 20px;
    }
  }
`

export default StudySupervisionsListWrapper
