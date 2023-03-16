import React from 'react'

// import InputText from '../Form'
// import { Select } from '../Select/Select'
// import CATEGORIES from './categories'
import FrequencyTypeSelect from './FrequencyTypeSelect'

// const renderSchema = props => {
//     let s
//
//     if (props.period === 'W' && props.frequency === 2) s = 'TW'
//     else {
//         s = `${(props.frequency !== 1 && props.frequency) || ''}${props.period}`
//         if (props.period === 'Q') {
//             s += `${props.interval}D`
//         }
//     }
//     if (props.duration !== '' && props.duration !== null) s += `x${props.duration}`
//     if (
//         props.period === 'Q' &&
//         props.duration <= 7 &&
//         props.duration2 !== '' &&
//         props.duration2 !== null
//     )
//         s = `(${s})x${props.duration2}`
//     return s
// }
// const schemaRegex = /^\(?(\d*)([WQ])((\d+)D)?(x(\d+))?\)?$/
// const checkSchema = schema => {
//     if (schema === 'TW') return null
//     if (schemaRegex.test(schema)) return null
//     return 'Invalid format'
// }
//
// const parseSchema = (schema, onChange) => {
//     if (schema === 'TW') {
//         return onChange({
//             frequency: 2,
//             period: 'W',
//             duration: null,
//             interval: 1,
//             duration2: null,
//             time_hour: 0,
//             time_minute: 0
//         })
//     }
//     if (!schemaRegex.test(schema)) return
//
//     let [, frequency, period, , interval, , duration] = schemaRegex.exec(schema)
//     if (frequency === '') frequency = 1
//     else frequency = parseInt(frequency)
//     if (interval) interval = parseInt(interval)
//     else interval = 1
//     if (duration) duration = parseInt(duration)
//     else duration = null
//     onChange({
//         frequency,
//         period,
//         duration,
//         interval,
//         duration2: null,
//         time_hour: 0,
//         time_minute: 0
//     })
// }
//
// const getSchemaLabel = category => {
//     switch (category) {
//         case CATEGORIES.MONITORING:
//             return 'Monitoring Schedule'
//         case CATEGORIES.SAMPLE:
//             return 'Sample Schedule'
//         case CATEGORIES.TREATMENT:
//             return 'Treatment Schedule'
//         case CATEGORIES.INDUCTION:
//             return 'Induction Schedule'
//         case CATEGORIES.RANDOMISATION:
//             return 'Randomisation Schedule'
//         default:
//             return 'Schedule'
//     }
// }
//
// export const RenderCustomFrequency = (brickFrequency, onChange) => (
//     <InputText
//         disabled
//         id="brick_custom_frequency"
//         label={getSchemaLabel('INDUCTION')}
//         value={renderSchema(brickFrequency)}
//         validators={[checkSchema]}
//         onChange={e => parseSchema(e, onChange)}
//         margin="normal"
//         required
//         fullWidth
//     />
// )
// type: 'cf',
// frequency: 1,
// period: 'Q',
// duration: null,
// interval: 1,
// duration2: null,
// time_hour: 0,
// time_minute: 0

// const getBrickRefOptions = bricks =>
//     bricks.map(b => ({
//         ...b,
//         brick_name: b.brick.name
//     }))
//
// const renderReferencedFrequency = (brick, bricks, onChange) => (
//     <Select
//         label={(brick.brick_frequency.type === 'af' && 'After: ') || 'Before: '}
//         options={getBrickRefOptions(bricks)}
//         inputProps={{ id: 'id', name: 'brick_name' }}
//         id="brick_referenced_frequency"
//         value={(brick.brick_frequency.target_id && brick.brick_frequency.target_id) || ''}
//         onChange={e => onChange({ target_id: e.props.option.id })}
//     />
// )

// const renderTimepoints = () => <div>Coucou 3</div>

// const renderFields = (brick, bricks, onChange) => {
//     if (brick.brick_frequency) {
//         switch (brick.brick_frequency.type) {
//             // case 'cf':
//             //     return renderCustomFrequency(brick, onChange)
//             case 'af':
//             case 'bf':
//                 return renderReferencedFrequency(brick, bricks, onChange)
//             case 'tp':
//                 return renderTimepoints(brick, onChange)
//             default:
//                 return null
//         }
//     }
// }

const BrickFrequency = ({ onChange, brick, allBricks }) => (
  <FrequencyTypeSelect allBricks={allBricks} brick={brick} onChange={v => onChange({ type: v })} />
)

export default BrickFrequency
