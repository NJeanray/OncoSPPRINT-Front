import { sortBy } from 'lodash'

const setChoiceFieldsOptions = (studyChoiceFields, field) =>
  studyChoiceFields
    .get(field)
    .toArray()
    .reduce((acc, item) => {
      return sortBy(
        [
          ...acc,
          {
            label:
              item
                .toArray()[1]
                .charAt(0)
                .toUpperCase() + item.toArray()[1].slice(1),
            value: item.toArray()[0]
          }
        ],
        [item => item.label.toLowerCase()]
      )
    }, [])

export default setChoiceFieldsOptions
