import React from 'react';

import classes from './List.css';

const createOptions = (size) => {
        const teamList = [];
        for (let i = 1; i <= size; i++) { 
            teamList.push({key: i, value: ''});
        } 
        console.log(size);
        console.log(teamList);
        const team = [];
        const options = teamList.map(member => {
            team.push(<li key={member.key}>{member.valiue}</li>);
            return options;
        })
        //return options;
    }
    
const list = (props) => (
    <div className={classes.List}>
        <ul>{createOptions(props.size)}</ul>
    </div>
);

export default list;