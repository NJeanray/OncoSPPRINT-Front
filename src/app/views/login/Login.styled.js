import styled, { css } from 'styled-components'
import Grid from '@material-ui/core/Grid'

import sideBarBackground from 'app/assets/login-sidebar-background.png'

const LoginWrapper = styled(Grid)`
  ${({ theme: { colors, fontSize } }) => css`
    height: 100%;
    .MuiGrid-item {
      width: 0;
    }

    .login__left-side {
      background-image: url(${sideBarBackground});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom;
      background-color: ${colors['navy-blue-color']};

      .left-side__logo {
        width: 200px;
        margin: 40px 0;
      }

      .left-side__motto {
        color: white;
        font-weight: 200;
        font-size: ${fontSize['x-small-font-size']};
        letter-spacing: 2px;

        span {
          b {
            font-size: ${fontSize['regular-font-size']};
          }

          margin: 0 10px;
          font-size: ${fontSize['small-font-size']};
        }
      }
    }
    .login__right-side-form {
      width: 500px;
    }
  `}
`

export default LoginWrapper
