import React, { Children } from 'react';
import { LoaderType } from '../../global/enums';
import { BigLoader } from '../loaders/big-loader';
import { ListLoader } from '../loaders/list-loader';
import { OneLineList } from '../loaders/one-line-list';
import { TextLoader } from '../loaders/text-loader';

interface StateProps {
    loaderType: LoaderType;
    isLoading: boolean;
    children: any;
    listElementAmount?: number;
}

export const LoadingComponent = ({ loaderType, isLoading, children, listElementAmount }: StateProps) => {
    const renderContent = () => {
        switch (loaderType) {
            case LoaderType.TEXT:
                return <TextLoader />;
            case LoaderType.BIG:
                return <BigLoader />;
            case LoaderType.LIST:
                if (!listElementAmount) return null;
                return <ListLoader listElementAmount={listElementAmount} />;
                case LoaderType.ONE_LINE:
                    if (!listElementAmount) return null;
                    return <OneLineList listElementAmount={listElementAmount}/>
            default:
                break;
        }
    };

    return isLoading ? renderContent() : children;
};
