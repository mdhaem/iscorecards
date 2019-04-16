import React from 'react';

import * as classes from './ScoreCardCell.css';

const scoreCardCell = (props) => {
    //console.log(props.id);

    const cell = <input
                    key={props.id} 
                    id={props.id} 
                    // ref={props.id} stateless compoonent cannot have ref
                    className={classes.ScoreCardCell} 
                    value={props.value}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    type={props.type} 
                    column={props.column}
                    onBlur={null}
                    onChange={props.changed}
                    onFocus={props.focus} />;
    //console.log(cell);
    return cell;
}

export default scoreCardCell;