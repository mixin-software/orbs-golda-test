import { Guardian } from '@orbs-network/pos-analytics-lib'
import React from 'react'

interface StateProps {
    guardian: Guardian
}

export const GuardianSearchElement = ({guardian}: StateProps) =>  {
    const {address, name} = guardian
    return (
        <div>
            <p>{`${name} (${address})`}</p>
        </div>
    )
}

