import React from 'react'
import classNames from 'classnames'

import SheetContainerWrapper from './SheetContainer.styled'

const SheetContainer = ({ children, top = false, width }) => {
  return (
    <SheetContainerWrapper width={width}>
      <div
        className={classNames('sheet-container__rectangle', {
          'sheet-container__left-rectangle': !top,
          'sheet-container__top-rectangle': top
        })}
      />
      {children}
    </SheetContainerWrapper>
  )
}

export default SheetContainer
