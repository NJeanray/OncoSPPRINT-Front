import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import SwitchWrapper from './Switch.styled'

const Switch = ({
  disabled,
  value,
  setValue,
  labelLeft = 'global.boolean.false',
  labelRight = 'global.boolean.true'
}) => {
  return (
    <SwitchWrapper>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => {
          if (!disabled) setValue('minus')
        }}
        className={classNames({
          'switch-btn--active': value === 'minus',
          'switch-btn--inactive': value !== 'minus'
        })}
      >
        <FormattedMessage id={labelLeft} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => {
          if (!disabled) setValue('plus')
        }}
        className={classNames({
          'switch-btn--active': value === 'plus',
          'switch-btn--inactive': value !== 'plus'
        })}
      >
        <FormattedMessage id={labelRight} />
      </div>
    </SwitchWrapper>
  )
}

export default Switch
