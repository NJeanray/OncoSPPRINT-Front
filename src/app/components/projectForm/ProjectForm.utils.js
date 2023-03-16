export const getProjectErrorFieldName = errorField => {
  switch (errorField) {
    case 'type':
      return 'flux'
    case 'owner_id':
      return 'owner'
    case 'second_owner_id':
      return 'second owner'
    case 'contact_id':
      return 'contact'
    case 'client_id':
      return 'client'
    case 'project_code':
      return 'code'
    default:
      return errorField
  }
}

export const getCurrentYearTwoDigits = () => {
  return Number(
    new Date()
      .getFullYear()
      .toString()
      .substr(-2)
  )
}

export const getYearsReference = () => {
  const yearReferenceArray = new Array(5)
  const currentYearTwoDigits = getCurrentYearTwoDigits()

  for (let i = 0; i < yearReferenceArray.length; i += 1) {
    yearReferenceArray[i] = { value: currentYearTwoDigits + i, label: currentYearTwoDigits + i }
  }
  return yearReferenceArray
}
