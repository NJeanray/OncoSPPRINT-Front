const getErrorFieldName = errorField => (errorField === 'consumable_id' ? 'consumable' : errorField)

export default getErrorFieldName
