import styled from 'styled-components'

const StudyFormWrapper = styled.div`
  && {
    ${props =>
      props.fetching === 'true' &&
      `
        display: flex;
        justify-content: center;
        padding: 60px 0;
      `};
    max-width: 500px;
    
    & > div {
      margin: 10px 0;
    }
    
    & > button {
      margin-top: 20px;
    }
`

export default StudyFormWrapper
