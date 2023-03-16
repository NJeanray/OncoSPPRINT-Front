import styled from 'styled-components'

const Wrapper = styled.div`
  .event-form__circle-spinner--display {
    display: flex;
    justify-content: center;
  }

  .event-form__allForms--display {
    display: flex;
    flex-direction: column;
  }

  .event-form__circle-spinner--hidden,
  .event-form__allForms--hidden {
    display: none;
  }
`

export default Wrapper
