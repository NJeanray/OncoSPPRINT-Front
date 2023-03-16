import styled, { css } from 'styled-components'

const PartFormWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      ${props =>
        props.fetching === 'true' &&
        `
        display: flex;
        justify-content: center;
        padding: 100px 0;
      `};
      width: 600px;

      .MuiGrid-container {
        display: flex;
        justify-content: space-between;

        & > div {
          margin-bottom: 15px;
        }

        .MuiGrid-grid-xs-12 {
          .MuiFormControl-root {
            width: 100%;
          }
        }

        .MuiGrid-grid-xs-6 {
          .radio-group__wrapper {
            .MuiFormControl-root {
              display: flex !important;
              justify-content: flex-start !important;
            }
          }

          .grid-animals-select__wrapper {
            display: flex;
          }

          .MuiFormControl-root,
          .radio-group__wrapper,
          .grid-animals-select__wrapper {
            width: 100%;
          }

          margin-bottom: 20px;
          max-width: 40%;
          display: flex;
          align-items: flex-end;
          height: fit-content;
          flex-direction: column;
        }
      }

      .MuiFormControl-marginNormal {
        margin-top: 0;
      }

      .MuiAlert-filledWarning {
        margin-bottom: 20px;
      }
    }
  `}
`

export default PartFormWrapper
