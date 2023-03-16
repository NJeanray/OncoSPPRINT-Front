export const paramsSubcontractings = params => {
  return {
    label: params.subcontractingLabel,
    cost: params.subcontractingCosting,
    reduc_cost: params.subcontractingCostingReduction,
    total_cost: params.subcontractingCostingReduction,
    study_model_id: params.studyModel.id
  }
}

export const paramsCustomTasks = params => {
  return {
    description: params.taskDescription,
    hours: params.taskHours,
    labor_type: {
      id: params.taskFunctionJobSelected.id
    },
    total_cost: params.taskFunctionJobSelected.hourly_rate * params.taskHours,
    study_model_id: params.studyModel.id,
    laboratory: {
      id: params.taskLaboratorySelected.id
    }
  }
}

export const paramsCustomConsumables = params => {
  return {
    description: params.consumableDescription,
    quantity: params.consumableQuantity,
    consumable: params.consumableSelected,
    total_cost: params.consumableSelected
      ? params.consumableSelected.prix_achat_ht * params.consumableQuantity
      : 0,
    study_model_id: params.studyModel.id
  }
}
