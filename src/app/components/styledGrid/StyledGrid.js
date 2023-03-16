import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'

const StyledGrid = styled(Grid)`
  &&& {
    display: flex;
    justify-content: space-between;

    & > div {
      margin-bottom: 15px;
      //align-items: center;
    }

    .MuiGrid-grid-xs-12 {
      .MuiFormControl-root {
        width: 100%;
      }
    }
  }

  .MuiGrid-grid-xs-6 {
    margin-bottom: 20px;
    display: flex;
    height: fit-content;
    flex-direction: column;
    max-width: 40%;

    ${props =>
      `
        // max-width: ${props.width ? props.width : '40%'};
         align-items: ${props.alignItems ? props.alignItems : 'center'};
      `}
  }
`

export default StyledGrid
