import React, { FunctionComponent as Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MenuOption, RouteParams } from '../../global/types';
import './section-menu.scss';



interface StateProps {
    options: MenuOption[];
}

  export const SectionMenu: Component<StateProps>  = ({options}: StateProps) => {
     const [selected, setSelected] = useState<string | null>(null);
     const params: RouteParams = useParams();
    useEffect(() => {
        const newSelected = params.section
        setSelected(newSelected)
    }, [window.location.pathname]);

    return (
        <ul className="section-menu flex-start">
            {options.map((option: MenuOption, index: number) => {
                const { route, key, name } = option;
                const isSelected = key.toLocaleLowerCase() === selected
                const className = `flex-center ${isSelected && 'section-menu-element-selected'} section-menu-element`
                return (
                    <li  key={index} className={className}>
                      <Link to ={route} className='flex-center'>
                       <p className='capitalize'> {name}</p>
                      </Link>
                    </li>
                );
            })}
        </ul>
    );
};

