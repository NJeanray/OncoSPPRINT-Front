import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const getEthicalProtocols = state => {
  return state.data.getIn(['ethicalProtocols', 'data'])
}

const getEthicalProtocolsItem = eachField => {
  return {
    label: `${eachField.get('procedure_number')} - ${eachField.get('experimental_procedure')}`,
    value: eachField.get('id')
  }
}

export const getEthicalProtocolsSelector = createSelector(
  [getEthicalProtocols],
  ethicalProtocols => {
    if (!ethicalProtocols) return []

    const toto = sortBy(
      ethicalProtocols
        .valueSeq()
        .map(eachField => getEthicalProtocolsItem(eachField))
        .toJS(),
      [item => item.label.toLowerCase()]
    )

    const sortAlphabetically = toto.filter(item => Number.isNaN(Number(item.label.charAt(0))))
    const sortNumerically = toto.filter(item => !Number.isNaN(Number(item.label.charAt(0))))

    return [...sortAlphabetically, ...sortNumerically]
  }
)
