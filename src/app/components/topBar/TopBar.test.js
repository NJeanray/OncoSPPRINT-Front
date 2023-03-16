import { shallow } from 'enzyme'
import React from 'react'

import TopBar from './TopBar'

describe('TopBar component', () => {
  it(
    'should remove accesstoken and refreshtoken from localStorage when button has' +
      ' been clicked',
    () => {
      const wrapper = shallow(<TopBar />)
      wrapper.find('#btn-logout').simulate('click')

      expect(localStorage.removeItem).toHaveBeenLastCalledWith('accessToken')
      // dispatch(action.update(KEY, VALUE));
      // expect(localStorage.__STORE__[KEY]).toBe(VALUE);
      // expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    }
  )
})
