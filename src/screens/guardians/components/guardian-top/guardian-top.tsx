import React from 'react'
import { GuardianInfo } from './components/guardian-info/guardian-info';
import { GuardianSearch } from './components/guardian-search/guardian-search'
import './guardian-top.scss';
export const GuardianTop = () =>  {
    return (
        <div className='guardian-top flex-start-center'>
                <GuardianSearch />
                <GuardianInfo />
        </div>
    )
}

