import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import EventRandomizationForm from 'app/components/eventRandomizationForm'
import EventInductionForm from 'app/components/eventInductionForm'
import EventTreatmentForm from 'app/components/eventTreatmentForm'
import EventTransfertForm from 'app/components/eventTransfertForm'
import EventSubcontractingForm from 'app/components/eventSubcontractingForm'
import EventImagingForm from 'app/components/eventImagingForm'
import EventMonitoringForm from 'app/components/eventMonitoringForm'
import EventSampleForm from 'app/components/eventSampleForm'
import EventFacsExVivoBCEForm from 'app/components/eventFacsExVivoBCEForm'
import EventDosageElisa from 'app/components/eventDosageElisa'
import EventIHC from 'app/components/eventIHC'
import { PartContext } from 'app/contexts/PartProvider'

const checkCategoryTransfert = category =>
  category === 'transfert' || category === 'transfer_external' || category === 'transfer_intern'

const checkCategoryFacs = category =>
  category === 'facsExVivoBCE' || category === 'facs_ex_vivo_bce'

const checkCategoryDosageElisa = category =>
  category === 'dosage_elisa' || category === 'dosageElisa'

const EventContent = ({ category }) => {
  const { partSelected } = useContext(PartContext)

  return (
    <div>
      <div className="event-form__step">
        <FormattedMessage id="eventForm.step" /> 2
      </div>
      {category === 'randomisation' && <EventRandomizationForm />}
      {category === 'induction' && <EventInductionForm partSelected={partSelected} />}
      {category === 'imagery' && <EventImagingForm />}
      {category === 'monitoring' && <EventMonitoringForm partSelected={partSelected} />}
      {category === 'subcontracting' && <EventSubcontractingForm />}
      {category === 'treatment' && <EventTreatmentForm partSelected={partSelected} />}
      {category === 'sample' && <EventSampleForm partSelected={partSelected} />}
      {category === 'ihc' && <EventIHC />}
      {checkCategoryDosageElisa(category) && <EventDosageElisa partSelected={partSelected} />}
      {checkCategoryTransfert(category) && <EventTransfertForm />}
      {checkCategoryFacs(category) && <EventFacsExVivoBCEForm />}
    </div>
  )
}

export default EventContent
