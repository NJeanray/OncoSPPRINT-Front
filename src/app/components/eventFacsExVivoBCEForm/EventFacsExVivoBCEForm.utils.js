import { fromJS } from 'immutable'

export const panelObjInitialize = {
  type: 'standard',
  name: null,
  antibody_ids: []
}

export function initializeFromEventSelected(
  setPanels,
  setTransfertSelected,
  eventSelected,
  standardPanels
) {
  const panelEventData = eventSelected.get('panels')
  const standardPanelsOptions = standardPanels.map(item => item.label)

  const panelsToSet = panelEventData.toJS().map(panel => {
    const panelObj = {
      type: standardPanelsOptions.includes(panel.name) ? 'standard' : 'custom',
      name: panel.name,
      antibody_ids: panel.antibody_ids
    }

    return panelObj
  })

  setPanels(fromJS(panelsToSet))
  setTransfertSelected(eventSelected.get('transfer_ids').toJS())
}
