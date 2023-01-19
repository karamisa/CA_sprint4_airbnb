import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

import {useState} from 'react'

export function DateSelect({chekcInDate=new Date(), checkOutDate=null}) {
const [state, setState] = useState([
    {
      startDate: chekcInDate,
      endDate: checkOutDate,
      key: 'selection'
    }
  ])
  

  return (
<DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
  months={2}
  direction="horizontal"
  rangeColors={['black']}
  showDateDisplay={false}
  showMonthAndYearPickers={false}
//   disabledDates=[]

/>
  )
}