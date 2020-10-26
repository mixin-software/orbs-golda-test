import React from 'react'
import './loaders.scss';
import { TextLoader } from './text-loader';

interface StateProps {
    listElementAmount: number;
}

export const ListLoader = ({listElementAmount}: StateProps) => {
    return (
            <ul className='loader-list'>
                {Array.apply(null, Array(6)).map(() => {
                    return <li className='flex-start-center loader-list-element'>
                        {
                            Array.apply(null, Array(listElementAmount)).map(() => {
                                return <div> <TextLoader /></div>
                            })
                        }
                            
                            
                    </li>
                })}
            </ul>
      
    )
}

