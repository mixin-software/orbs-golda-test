import React from 'react';
import { LoaderType } from '../../global/enums';
import { LoadingComponent } from '../loading-component/loading-component';
import './list.scss';

interface StateProps {
    isLoading: boolean;
    titles: string[];
    loadersAmount: number;
    listLength?: number;
}

export const List = (props: any) => {
    const { isLoading,titles, loadersAmount, listLength}: StateProps  = props
    return (
        <div className="list">
            <header className="list-header flex-start-center">
             {titles.map((title: any, index: number) => {
                 return (
                     <h3 key={index} className="list-item">
                         {title}
                     </h3>
                 );
             })}
         </header>
            <LoadingComponent isLoading={isLoading} loaderType={LoaderType.LIST} listElementAmount={loadersAmount} listLength = {listLength}>
                <ul>
                   {props.children}
                </ul>
            </LoadingComponent>
        </div>
    );
};
