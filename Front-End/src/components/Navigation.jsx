import { NavLink } from "react-router-dom";
import classes from '../resources/css/components/navigation.module.css';

function Navigation () {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? classes.active : ""}>
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='favorites'
                        className={({ isActive }) => isActive ? classes.active : ""}>
                        Favorites
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='admin'
                        className={({ isActive }) => isActive ? classes.active : ""}>
                        Admin
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;