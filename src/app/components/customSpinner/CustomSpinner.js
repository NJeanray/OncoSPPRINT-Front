import React from 'react'
import { ClapSpinner, SwishSpinner, PulseSpinner, ImpulseSpinner } from 'react-spinners-kit'
import { WrapperLoader } from './CustomSpinner.styled'

const CustomSpinner = ({ type, size, wrapper = false, backColor = '#000000' }) => {
  const getRightSpinner = () => {
    switch (type) {
      case 'swish':
        return <SwishSpinner size={size} frontColor="#1C253C" backColor={backColor} />
      case 'pulse':
        return <PulseSpinner size={size} frontColor="#1C253C" backColor={backColor} />
      case 'circle':
        return <ClapSpinner size={size} frontColor="#1C253C" backColor={backColor} />
      case 'line':
        return <ImpulseSpinner size={50} frontColor="#1C253C" backColor={backColor} />
      default:
        return <SwishSpinner size={size} frontColor="#1C253C" backColor={backColor} />
    }
  }

  return (
    <WrapperLoader type={type} wrapper={wrapper}>
      {getRightSpinner()}
    </WrapperLoader>
  )
}

CustomSpinner.defaultProps = {
  size: 150
}

export default CustomSpinner
