import styled from 'styled-components'

export const WrapperLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 19px 0;
  height: 100%;

  ${props =>
    props.wrapper &&
    `

    height: calc(100vh - 280px);
  `}

  ${props =>
    props.type === 'circle' &&
    `
      margin: 180px 0;
    `}
`
