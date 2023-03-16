import styled from 'styled-components'

const StudySupervisionFormWrapper = styled.div`
  ${props =>
    props.fetching === 'true' &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0;
  `}

  & > div:nth-child(3) {
    margin: 15px 0px;
  }

  .MuiButton-root {
    margin-top: 20px;
  }

  .add-delete-study-supervision-btn {
    display: flex;
    justify-content: flex-end;
  }

  .MuiExpansionPanelDetails-root {
    display: flex;
    flex-direction: column;
  }
`

export default StudySupervisionFormWrapper
