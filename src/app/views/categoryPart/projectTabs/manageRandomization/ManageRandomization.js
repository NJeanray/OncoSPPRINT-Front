import React, { Fragment } from 'react'
import SheetContainer from 'app/components/sheetContainer'
import TextTitle from 'app/components/textTitle/TextTitle'
import EventRandomizationForm from 'app/components/eventRandomizationForm'
import { FormattedMessage } from 'react-intl'
import Box from '@material-ui/core/Box'
import StyledMainAddBtn from 'app/components/styledMainAddBtn/StyledMainAddBtn'
import { eventEndpoint } from 'app/api/endpoints'

const ManageRandomization = ({ createRandomization, partId }) => {
  const [openCreatingModal, setOpenCreatingModal] = React.useState(false)
  const [action, setAction] = React.useState('create')

  const handleCreateRandomizationEvent = eventFields => {
    createRandomization('brick', {
      endpoint: eventEndpoint(),
      params: {
        part_id: partId,
        ...eventFields
      }
    })
  }
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={4}>
      <SheetContainer top={true} width="600px">
        <Fragment>
          <TextTitle
            text={
              <FormattedMessage
                id={
                  action === 'create' ? 'manageRandomization.create' : 'manageRandomization.title'
                }
              />
            }
          />
          <EventRandomizationForm
            action={action}
            handleCreateRandomizationEvent={handleCreateRandomizationEvent}
          />
        </Fragment>
      </SheetContainer>
    </Box>
  )
}

export default ManageRandomization
