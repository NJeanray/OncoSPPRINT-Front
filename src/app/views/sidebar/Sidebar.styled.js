import styled, { css } from 'styled-components'

export const Wrapper = styled.nav`
  ${({ theme: { colors } }) => css`
    flex-grow: 1;
    margin: 0;
    min-height: calc(100vh - 64px);
    background-color: ${colors['navy-blue-color']};
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    color: white;

    .MuiList-padding {
      padding-top: 0;
    }

    .list-item-link__part {
      padding-left: 50px;
    }

    .MuiListItemText-root {
      padding: 0;

      .MuiTypography-body1 {
        font-weight: bold;
      }
    }

    a {
      text-decoration: none;
      color: white;
    }
  `}
`

export const LiStyled = styled.li`
  ${({ lvlNested, isSelected, theme: { colors } }) => css`
    padding-left: ${lvlNested * 32}px;
    ${isSelected && `background-color: ${colors['navy-blue--selected-color']};`}
  `}
`

export const HeaderSidebar = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  .MuiSvgIcon-root {
    font-size: 70px;
  }

  .project__title {
    margin: 20px 0;
  }
`
