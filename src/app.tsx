import React, { FunctionComponent as Component } from 'react';
import { RootRouter } from './routes';
import './scss/app.scss';


const App: Component = () => {
 

    return (
        <div className='app flex-between'>
            <RootRouter />
        </div>
    )
};

export default App;
