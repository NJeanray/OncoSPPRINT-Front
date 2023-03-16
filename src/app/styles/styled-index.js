import { createGlobalStyle } from 'styled-components'
import { colors, fontSize } from './styled-variables'

export const theme = {
  colors: { ...colors },
  fontSize: { ...fontSize }
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

  *, *:before, *:after {
    box-sizing: border-box;
    font-family: Lato, 'sans-serif';
  }
  
  html, body, #root {
    height: 100%;
    margin: 0;
    overflow-x: hidden;
    
    .MuiSvgIcon-colorPrimary {
      color: white;
    }
    
    .MuiMenu-list {
      max-height: 500px;
    }
  }
  
   .MuiExpansionPanelDetails-root {
    display: flex;
    flex-direction: column;
  }
  
  .btn__flex-end {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
  }
  
  .btn__flex-start {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  #root {
    display: flex;
    flex-direction: column;
  }
  
  .grid-items-wrapper__filters {
    .MuiGrid-item {
      margin-right: 40px;
    }
  }
  
  .event-form__step {
    text-transform: uppercase;
    color: ${colors['bright-purple-color']};
    font-size: ${fontSize['small-font-size']};
    font-weight: bold;
    letter-spacing: 2px;
    margin: 20px 0;
    width: 100%;
  }
  
  .event-form__timepoint-wrapper {
      display: flex;
      align-items: center;

      & > div:nth-child(2) {
        margin-left: 20px;
      }

    .event-form__timepoint-d0 {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      letter-spacing: 2px;
      color: ${colors['dark-purple-color']};
    }
  }
`

export default GlobalStyle
