import React from 'react';

import classes from './Home.css';

const homePage = (props) => (
    <div className={classes.Home}>
        <h1>Score Cards</h1>
        <p className={classes.Instructions}>Score Cards provides means of scoring 
        you're card games. You do not need to login. Just select Play, enter a game 
        name and a list of players. Click on continue and you will be presented 
        with a score card. However, if you wish to maintain a history of the games 
        played with what team, you will need to register and login. Registration 
        creats a unique ID which allow the identification of your game data. <strong>
        Email and password used for registry and subsequent login are never saved.</strong></p>
    </div>
);

export default homePage;