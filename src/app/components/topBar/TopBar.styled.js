import styled, { css } from 'styled-components'

const TopBarWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    z-index: 100;
    position: relative;

    .top-bar__list-wrapper {
      width: 310px;
      background-color: ${colors['navy-blue-color']};
      position: absolute;
      right: 0;
      top: 64px;
      &:hover {
        cursor: pointer;
      }

      .MuiTypography-body1 {
        letter-spacing: 2px;
        text-transform: uppercase;
        font-size: ${fontSize['x-small-font-size']};
      }
    }

    .MuiAppBar-colorPrimary {
      background-color: ${colors['navy-blue-color']};

      .MuiToolbar-root {
        display: flex;
        justify-content: space-between;
        position: relative;

        .right-side__logo {
          width: 135px;
          cursor: pointer;
        }

        .top-bar__right-side {
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }

          .right-side__user-name {
            font-size: ${fontSize['small-font-size']};
          }

          .right-side__avatar {
            background-color: white;
            color: ${colors['purple-color']};
            font-size: ${fontSize['regsular-font-size']};
            width: 40px;
            height: 40px;
            font-weight: 600;
          }
        }
      }
    }
  `}
`

export default TopBarWrapper
