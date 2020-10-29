import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SectionMenu } from '../../../../components/section-menu/section-menu';
import { AppState } from '../../../../redux/types/types';
import { generateGuardiansRoutes } from '../../../../utils/guardians';

export const GuardianSectionSelect = () => {
    const { selectedGuardian } = useSelector((state: AppState) => state.guardians);

    const { t } = useTranslation();
    return (
        <SectionMenu options={generateGuardiansRoutes(t, selectedGuardian)} />
    );
};
