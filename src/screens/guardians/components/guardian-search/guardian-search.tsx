import { Guardian } from '@orbs-network/pos-analytics-lib';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useClickOutside } from 'react-click-outside-hook';
import { RouteParams } from '../../../../global/types';
import { getGuardianAction, setGuardianLoading } from '../../../../redux/actions/actions';
import { AppState } from '../../../../redux/types/types';
import { routes } from '../../../../routes/routes';
import { checkIfLoadDelegator, filterGuardians, getGuardianByAddress } from '../../../../utils/guardians';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
export const GuardianSearch = () => {
    const { guardians, selectedGuardian } = useSelector((state: AppState) => state.guardians);
    const dispatch = useDispatch();
    const history: any = useHistory();
    const { t } = useTranslation();
    const [ref, hasClickedOutside] = useClickOutside();
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedGuardianName, setSelectedGuardianName] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const params: RouteParams = useParams();
    useEffect(() => {
        findGuardianOnLoad();
    }, []);

   

    const findGuardianOnLoad = () => {
        const { address } = params;
        if (!address) {
            return  dispatch(setGuardianLoading(false))
        }
        findGuardian(address);
        setSelectedGuardianName(address)
    };

    const findGuardian = (address: string) => {
        const loadGuardian = checkIfLoadDelegator(address, selectedGuardian);
        if (loadGuardian) {
            dispatch(getGuardianAction(address));
        }
    };
    const searchByAddress = (address: string) => {
        const { section } = params;
        history.push(routes.guardians.main.replace(':section?', section).replace(':address', address));
        findGuardian(address);
        setSelectedGuardianName(address)
    };
    useEffect(() => {
        const { address } = params;
        if (hasClickedOutside) {
            setShowResults(false);
            setGuardianNameAsValue(address);
        }
    }, [hasClickedOutside]);

    const setGuardianNameAsValue = (address?: string) => {
        if (!address) return;
        const guardian = getGuardianByAddress(guardians, address);
        if (!guardian) return;
        const string = `${guardian.name} (${guardian.address})`;
        setInputValue(string);
    };

    useEffect(() => {
        const { address } = params;
        setGuardianNameAsValue(address);
    }, [guardians && guardians.length]);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const value = e.clipboardData.getData('Text');
        searchByAddress(value);
    };

    const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputValue) return;
        if (e.key === 'Enter' || e.keyCode === 13) {
            searchByAddress(inputValue);
        }
    };
    const select = (guardian: Guardian) => {
        const { address } = guardian;
        setGuardianNameAsValue(address);
        setShowResults(false);
        searchByAddress(address);
        
    };

    const clear = () => {
        setInputValue('')
        setSelectedGuardianName('')
        setShowResults(true);
    }

    const generateBtn = () => {
        if (selectedGuardianName) {
            return <button type="button" className="search-input-box-btn flex-center"
                onClick = {() => clear() }
            >
                 <CloseRoundedIcon />
            </button>;
        }
        return (
            <button
                type="button"
                className="search-input-box-btn flex-center"
                onClick={() => searchByAddress(inputValue)}>
                <SearchRoundedIcon />
            </button>
        );
    };

    return (
        <div className="guardian search-input flex-column">
            <p className="search-input-title">{t('guardians.selectGuardian')}</p>
            <section className="search-input-box" ref={ref}>
                {generateBtn()}
                <input
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => submit(e)}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    value={inputValue}
                    onFocus={() => setShowResults(true)}
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                    placeholder={t('guardians.inputPlaceholder')}
                />
                {showResults && (
                    <ul className="search-input-box-results">
                        {filterGuardians(guardians || [], inputValue).map((result: Guardian, index: number) => {
                            const { address, name } = result;
                            return (
                                <li key={index} className="flex-start-center" onClick={() => select(result)}>
                                    <p className="text-overflow">{`${name} (${address})`}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
};
