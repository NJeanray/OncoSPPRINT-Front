import { createSelector } from 'reselect'

const getState = state => state.data

export const getChoiceFieldsSelector = createSelector(
  [getState, (_, obj) => obj, (_, __, arg) => arg, (_, __, ___, item) => item],
  (state, obj, field, thirdItem = null) => {
    const choiceFields = state.getIn([obj, 'data'])

    if (!choiceFields) return []
    return choiceFields
      .get(field)
      .toArray()
      .reduce((acc, item) => {
        const itemToAdd = thirdItem ? { [thirdItem]: item.toArray()[2] } : {}

        return [
          ...acc,
          {
            label:
              item
                .toArray()[1]
                .charAt(0)
                .toUpperCase() + item.toArray()[1].slice(1),
            value: item.toArray()[0],
            ...itemToAdd
          }
        ]
      }, [])
  }
)
