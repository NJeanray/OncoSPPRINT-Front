import styled, { css } from 'styled-components'

const EventFormWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      ${props =>
        props.fetching === 'true' &&
        `
          display: flex;
          justify-content: center;
          padding: 100px 0;
      `}

      .MuiGrid-container {
        display: flex;
        justify-content: space-between;

        .MuiButton-root {
          margin-top: 20px;
        }

        .MuiGrid-grid-xs-6 {
          max-width: 40%;
        }
      }

      // .event-form__step {
      //   text-transform: uppercase;
      //   color: ${colors['bright-purple-color']};
      //   font-size: ${fontSize['small-font-size']};
      //   font-weight: bold;
      //   letter-spacing: 2px;
      //   margin: 20px 0;
      //   width: 100%;
      // }
      //
      // .event-form__step--details {
      //   text-transform: uppercase;
      //   color: ${colors['grey-color']};
      //   font-size: ${fontSize['x-small-font-size']};
      //   font-weight: bold;
      //   letter-spacing: 2px;
      //   margin: 20px 0;
      // }
      //
      // .event-form__timepoint-wrapper {
      //   display: flex;
      //   align-items: center;
      //
      //   & > div:nth-child(2) {
      //     margin-left: 90px;
      //   }
      // }
      //
      // .event-form__timepoint-d0 {
      //   margin-left: 300px;
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   font-weight: 600;
      //   letter-spacing: 2px;
      //   color: ${colors['dark-purple-color']};
      // }
    }
  `}
`

export default EventFormWrapper
