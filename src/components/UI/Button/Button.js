import React from  'react';

import classes from './Button.css';

const button = (props) => (
    <button
        tyep="button"
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        name={props.name}
        ref={props.ref}
        onClick={props.clicked}>{props.children}</button>
);

export default button;