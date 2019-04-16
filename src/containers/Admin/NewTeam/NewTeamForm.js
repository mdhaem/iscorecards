import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './NewTeam.css';

let FormCode = props => {
  const {
    handleSubmit,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <div >
        <label className={classes.InputLabel}>Player List </label>
        <Field className={classes.Input} 
          name="team" 
          component="select" 
          onChange={props.changed} >

          {props.options.map((player, index) => {
            return <option key={index} value={player.value}>{player.displayValue}</option>
          })}
        </Field>
      </div>
    </form>
  )
}

FormCode = reduxForm({
  form: 'newTeam' 
})(FormCode)

export default FormCode;