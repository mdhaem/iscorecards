import React from 'react';
import { Field, reduxForm } from 'redux-form';

import buttonClasses from '../../../components/UI/Button/Button.css';
import classes from './NewPlayer.css';


const alphaNumeric = value =>
    value && /[^a-zA-Z ]/i.test(value) ? 'Only alphabetic characters' : undefined
const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)

  const renderField = ({
    input,
    label,
    plcholder,
    type,
    meta: { touched, error, warning }
  }) => (
      
    <div>
        
        <div>
        <label>{label}</label>
            <input {...input} placeholder={plcholder} className={classes.Input} type={type} />
        </div>
        <div>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
  )

let FormCode = props => {
  const { handleSubmit, pristine, submitting, reset } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <Field 
            name="firstName" 
            component={renderField} 
            label="First Name" 
            validate={[required, maxLength15, minLength2, alphaNumeric]}
            plcholder="enter first name..."/>
      </div>
      <div>
        <Field 
            name="lastName"
            component={renderField} 
            label="Last Name" 
            validate={[required, maxLength15, minLength2, alphaNumeric]}
            plcholder="enter last name..."/>
      </div>
      <div className="form-group">
        <button type="submit" className={buttonClasses.Button} disabled={pristine || submitting}>SAVE</button>
        <button type="button" className={buttonClasses.Button} disabled={pristine || submitting} onClick={reset}>CANCEL</button>
      </div>
    </form>
  )
}
FormCode = reduxForm({
  form: 'contact',
})(FormCode);

export default FormCode;