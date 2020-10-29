import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SectionMenu } from "../../../../components/section-menu/section-menu";
import { AppState } from "../../../../redux/types/types";
import { generateDelegatorsRoutes } from "../../../../utils/delegators";

export const DelegatorSectionSelector = () => {
    const { t } = useTranslation();
        const { selectedDelegator } = useSelector((state: AppState) => state.delegator);
    return <SectionMenu options={generateDelegatorsRoutes(t, selectedDelegator)} />
}