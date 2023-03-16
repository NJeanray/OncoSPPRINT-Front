// Here we define the mapping for all the categories in the database

const CATEGORIES = {
  SAMPLE: 'PRELEVEMENT',
  MONITORING: 'MONITORING',
  TREATMENT: 'TRAITEMENT',
  INDUCTION: 'INDUCTION',
  RANDOMISATION: 'RANDOMISATION',
  DESTINATION: 'DESTINATION PRELEVEMENT'
}

const DISPLAYED_CATEGORIES = [
  CATEGORIES.SAMPLE,
  CATEGORIES.MONITORING,
  CATEGORIES.TREATMENT,
  CATEGORIES.INDUCTION,
  CATEGORIES.RANDOMISATION
]

export default CATEGORIES
export { DISPLAYED_CATEGORIES }