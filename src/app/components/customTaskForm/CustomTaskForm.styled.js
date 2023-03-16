import styled from 'styled-components'

const CustomTaskFormWrapper = styled.div`
  ${props =>
    props.fetching &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
  `}
`

export default CustomTaskFormWrapper
