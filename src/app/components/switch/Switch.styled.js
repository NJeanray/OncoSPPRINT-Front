import styled, { css } from 'styled-components'

const TimepointWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
    display: flex;
    height: 40px;
    cursor: pointer;
    
    & > div {
      display: flex;
      padding: 5px 10px;
      width: 80px;
      justify-content: center;
      align-items: center;
      font-size: ${fontSize['small-font-size']};
      letter-spacing: 1px;
    }
    
    .switch-btn--active {
      background-color:  ${colors['purple-color']}
      color: white;
    }
    
    .switch-btn--inactive {
      background-color: white;
      color: ${colors['light-grey-color']};
      border: 1px solid  ${colors['light-grey-color']};
    }
  `}
`

export default TimepointWrapper
