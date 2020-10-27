import React, { ChangeEvent, useEffect, useState, FunctionComponent as Component } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../global/types';
import LoupeImg from '../../assets/images/loupe.svg';

import './search-input.scss';
import { Delegator, Guardian } from '@orbs-network/pos-analytics-lib';
import { SearchListType } from '../../global/enums';

interface StateProps {
    title: string;
    list?:any;
    filterProperty?: string[];
    returnSearchValue?: (value: string) => void;
    onLoadValue?: string;
    viewProperties?: string[];
    listType: SearchListType;
}

const filter = (list: Guardian[], value: string, filterProperty?: string[]) => {
    // if (!value || !filterProperty) return list;
    // return list.filter((element: any) => {
    //     return element['name'].indexOf(value) > -1;
    // });
    return []
};


const generateElement = (element: any, type: SearchListType) => {
    switch (type) {
        case SearchListType.GUARDIAN:
            const { name, address } = element;
            return <p>{`${name} (${address})`}</p>;
        default:
            return <p>{element.name}</p>;
    }
};

export const SearchInput = ({
    title,
    list,
    filterProperty,
    returnSearchValue,
    viewProperties,
    listType,
}: StateProps) => {
    const [ref, hasClickedOutside] = useClickOutside();
    const [inputValue, setInputValue] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const params: RouteParams = useParams();
    useEffect(() => {
        if (hasClickedOutside) {
            setShowResults(false);
        }
    }, [hasClickedOutside]);

    const handleChange = (value: string) => {
        setInputValue(value);
    };

    const selectResult = (value: any) => {
        setInputValue(value);
        setShowResults(false);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const value = e.clipboardData.getData('Text');
        returnValue(value);
    };

    useEffect(() => {
        const { address } = params;
        if (!address) return;
        setInputValue(address);
    }, [params.address]);

    const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputValue) return;
        if (e.key === 'Enter' || e.keyCode === 13) {
            returnValue();
        }
    };

    const returnValue = (value?: string) => {
        if (!returnSearchValue) return;
        returnSearchValue(value || inputValue);
    };

    const result = filter(list, inputValue, filterProperty);

    return (
        <div className="search-input flex-start-center">
            <p className="search-input-title">{title}</p>
            <section className="search-input-box" ref={ref}>
                <button type="button" className="search-input-box-btn flex-center" onClick={() => returnValue()}>
                    <img src={LoupeImg} alt="" />
                </button>
                <input
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => submit(e)}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    value={inputValue}
                    onFocus={() => setShowResults(true)}
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                />
                {showResults && (
                    <ul className="search-input-box-results">
                        {result &&
                            result.length > 0 &&
                            result.map((result: any) => {
                                return (
                                    <li className="flex-start-center" onClick={() => selectResult(result)}>
                                        {generateElement(result, listType)}
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </section>
        </div>
    );
};
