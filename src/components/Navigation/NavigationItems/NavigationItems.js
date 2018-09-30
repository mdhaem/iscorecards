import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationDropDown from './NavigationItem/DropDownItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link="/rplay" exact>Play</NavigationItem>
            : <NavigationItem link="/uplay" exact>Play</NavigationItem>}

        {props.isAuthenticated 
            ? <NavigationDropDown />
            : null}

        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;