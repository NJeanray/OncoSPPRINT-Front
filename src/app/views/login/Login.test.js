import { shallow } from 'enzyme'
import React from 'react'

import Login from './Login'

describe('login view', () => {
  it('should render matching page if valid path', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toHaveLength(1)
  })
})
