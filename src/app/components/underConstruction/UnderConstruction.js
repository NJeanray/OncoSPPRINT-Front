import React from 'react'
import styled, { css } from 'styled-components'
import Title from 'react-titles/Title6'

const UnderConstructionWrapper = styled.div`
  ${({ theme: { colors } }) => css`
    margin: 100px;
    display: flex;
    justify-content: center;

    text {
      fill: ${colors['navy-blue-color']};
      font-weight: bolder;
    }
    rect {
      stroke: ${colors['purple-color']};
    }
  `}
`

const UnderConstruction = () => {
  return (
    <UnderConstructionWrapper>
      <Title size="500" text1="UNDER" text2="CONSTRUCTION" open={true} />
    </UnderConstructionWrapper>
  )
}

export default UnderConstruction
