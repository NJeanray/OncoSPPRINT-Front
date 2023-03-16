import styled from 'styled-components'

const CreateEventWrapper = styled.div`
  &&& {
    .MuiGrid-container {
      & > div {
        margin-top: 20px;
      }

      & > div:nth-child(n + 0) {
        padding-right: 10px;
      }

      & > div:nth-child(2n + 0) {
        padding-left: 10px;
      }
    }
  }
`

export default CreateEventWrapper
