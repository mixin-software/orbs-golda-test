import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TimeRangeSelectorOptions } from '../../global/enums';
import './time-range-selector.scss';


export const TimeRangeSelector = () =>  {
    const [selected, setSelected] = useState(TimeRangeSelectorOptions.MONTHS)
    const {t} = useTranslation()
    const options = []
    return (
        <div className='time-range-selector flex-start-center'>
                <button>Days</button>
                <button>Weeks</button>
                <button>Months</button>
        </div>
    )
}

