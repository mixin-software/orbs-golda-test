import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ChartUnit, TimeRangeSelectorOptions } from '../../global/enums';
import './time-range-selector.scss';

interface Option {
    name: string;
    unit: ChartUnit;
}
interface StateProps {
    selectCallBack: (value: ChartUnit) => void;
    selected: ChartUnit;
}

export const TimeRangeSelector = ({selectCallBack, selected}: StateProps ) =>  {
    const {t} = useTranslation()
    const options = [{name:t('main.months'), unit: ChartUnit.MONTH},{name:t('main.weeks'), unit: ChartUnit.WEEK},{name:t('main.days'), unit: ChartUnit.DAY}]

    const select = (option: Option) => {
        selectCallBack(option.unit)
    }
    
    return (
        <div className='time-range-selector flex-start-center'>
               {options.map((option: Option, index: number) => {

                   const className = selected === option.unit ? 'time-range-selector-btn time-range-selector-selected' : 'time-range-selector-btn'
                   return <button 
                    onClick = {() => select(option)}
                   className={className} key = {index}>{option.name}</button>
               })}
        </div>
    )
}

