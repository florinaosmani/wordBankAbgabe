import { Outlet } from 'react-router-dom';

import Navigation from './Navigation';
import classes from '../resources/css/components/root.module.css';

function Root () {
    return (
        <>
            <header className={classes.header}>
                <Navigation />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root;