import styled, { css } from 'styled-components'

const TimepointWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      display: flex;
      background: white;
      //box-shadow: 0 0 30px #d1d1d1;
      border: 1px solid ${colors['light-grey-color']};
      height: 37px;
      width: 220px;
      position: absolute;
      overflow: hidden;

      input[type='radio'] {
        display: none;
      }

      .label1,
      .label2 {
        display: block;
        height: 180px;
        width: 100px;
        background-size: 130px 180px;
        background: linear-gradient(
          to bottom,
          white 0,
          white 37px,
          ${colors['purple-color']} 37px,
          ${colors['purple-color']} 180px
        );
        position: absolute;
        top: 0;
      }

      .label2 {
        right: 0;
      }

      span {
        display: flex;
        height: 37px;
        width: 130px;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: ${colors['grey-color']};
        user-select: none;
      }

      input:checked + label {
        background-position: 0 -37px;

        span {
          color: white !important;
        }
      }
    }
  `}
`

export default TimepointWrapper
