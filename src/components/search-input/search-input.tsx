import React, { ChangeEvent, useEffect, useState, FunctionComponent as Component } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../global/types';
import LoupeImg from '../../assets/images/loupe.svg';

import './search-input.scss';

interface StateProps {
    title: string;
    list: any;
    filterProperty?: string;
    returnSearchValue?: (value: string) => void;
    onLoadValue?: string;
}

const filter = (list: any, value: string, filterProperty?: string) => {
    if (!value || !filterProperty) return list;
    return list.filter((element: any) => {
        return element[filterProperty].indexOf(value) > -1;
    });
};

export const SearchInput = ({ title, list, filterProperty, returnSearchValue, onLoadValue }: StateProps) => {
    const [ref, hasClickedOutside] = useClickOutside();
    const [results, setResults] = useState(list);
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
        const newResults = filter(list, value, filterProperty);
        setResults(newResults);
    };

    const selectResult = (value: string) => {
        setInputValue(value);
        setShowResults(false);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const value = e.clipboardData.getData('Text');
        returnValue(value)
    };


    useEffect(() => {
        const {address} = params
        if(!address) return;
        setInputValue(address)
    }, [params.address])


 const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if(!inputValue) return
    if (e.key === 'Enter' || e.keyCode === 13) {
        returnValue()
    }
}

const returnValue = (value?: string) => {
    if (!returnSearchValue) return;
    returnSearchValue(value || inputValue);
}



    return (
        <div className="search-input flex-start-center">
            <p className="search-input-title">{title}</p>
            <section className="search-input-box" ref={ref}>
                <button type='button' className='search-input-box-btn flex-center' 
                    onClick = {() =>   returnValue()}
                ><img src={LoupeImg} alt=""/></button>
                <input
                onKeyUp = {(e: React.KeyboardEvent<HTMLInputElement>) => submit(e)}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    value={inputValue}
                    onFocus={() => setShowResults(true)}
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                />
                {showResults && (
                    <ul className="search-input-box-results">
                        {results.map((result: any) => {
                            return (
                                <li className="flex-start-center" onClick={() => selectResult(result.name)}>
                                    {result.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
};
