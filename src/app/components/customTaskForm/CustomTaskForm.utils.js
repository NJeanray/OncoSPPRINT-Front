const getErrorFieldName = errorField => {
  switch (errorField) {
    case 'labor_type':
      return 'job title'
    case 'task':
      return 'task description'
    default:
      return errorField
  }
}

export default getErrorFieldName
