import React from 'react';

import * as classes from './ScoreCardCell.css';

const scoreCardCell = (props) => {
    //console.log(props.id);

    const cell = <input
                    key={props.id} 
                    id={props.id} 
                    className={classes.ScoreCardCell} 
                    value={props.value}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    type={props.type} 
                    column={props.column}
                    onBlur={props.changed}
                    onChange={null} />;
    //console.log(cell);
    return cell;
}

export default scoreCardCell;