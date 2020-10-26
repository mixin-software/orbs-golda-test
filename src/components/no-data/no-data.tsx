import React from 'react'
import { useTranslation } from 'react-i18next'
import  './no-data.scss';

export const NoData = () => {
    const {t} = useTranslation()
    return (
        <div className='no-data flex-center'>
           <p> {t('main.noData')}</p>
        </div>
    )
}

