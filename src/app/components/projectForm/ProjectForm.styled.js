import styled, { css } from 'styled-components'

const ProjectFormWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      ${props =>
        props.isFetching === true &&
        `
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;`
      }

       width: 600px;
       
      .project-form__code-year-ref {
        width: 150px;
        margin-right: 15px;
        margin-top: 3px;
      }

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
          margin-bottom: 20px;
          max-width: 40%;
          display: flex;
          align-items: flex-end;
          height: fit-content;
          flex-direction: column;

          .project-form__code-label-inputs-wrapper {
            margin-top: 6px;

            .code-label {
              color: ${colors['purple-color']};
              text-transform: uppercase;
              font-size: ${fontSize['x-small-font-size']};
            }

            .code-wrapper {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .MuiInputBase-root {
                .MuiSelect-select,
                input {
                  letter-spacing: 2px;
                }
              }
            }
          }

          & > div:first-child {
            width: 100%;

            .MuiInputBase-adornedEnd {
              margin-top: 16px;

              .MuiIconButton-root {
                padding: 0;
              }
            }
          }

        .MuiFormControl-marginNormal {
          margin-top: 0;
        }
      }
    }
  `}
`

export default ProjectFormWrapper
