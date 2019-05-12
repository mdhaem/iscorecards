import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import axios from '../../../store/axios-data'

import classes from './NewPlayer.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'

const newPlayerForm = ({
    values,
    errors,
    touched,
    isSubmitting
}) => {
    return ( 
        <div className={classes.NewPlayer}>
        <h1>New Player</h1>
        <p className={classes.Instructions}>Enter the new game name and expected number of hands. 
        Additional hands can always be added once the score card is displayed.</p>
        <Form>
            {isSubmitting ? <Spinner /> : null}
            {(values.exists || values.playerAdded )&& <p>{values.message}</p>}
            {errors.message && <p>{errors.firstName}</p>}
            <div>
                {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                <label>First Name</label>
                <Field type="text" name="firstName" className={classes.Input} placeholder="Enter first name..." />
            </div>
            <div>
                {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                <label>Last Name</label>
                <Field type="text" name="lastName" className={classes.Input} placeholder="Enter last name..." />
            </div>
            <Button btnType="Danger" clicked={this.handleCancel}>CANCEL</Button>    
            <Button btnType="Success" type="submit" disabled={isSubmitting}>Save New Player</Button>
        </Form>
        </div>
    )
}

const FormikNewPlayerForm = withFormik({
    mapPropsToValues({ firstName, lastName }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            exists: false,
            playerAdded: false

        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().min(2, 'First name must be at least 2 charters.').required('First name is required.'),
        lastName: Yup.string().min(2, 'Last name must be at least 3 charters.').required('Last name is required.')
    }),
    handleCancel (values){
        values.cancel = true
    },
    handleSubmit(values, { resetForm, setErrors, setSubmitting } ) {
        const newPlayer = {
            user: localStorage.getItem('userId'),
            firstName: values.firstName,
            lastName: values.lastName,
            fullName: values.firstName + ' ' + values.lastName
        }

        //get all games for user
        const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + newPlayer.user + '"';
        axios.get( '/players.json' + queryParams).then( response => {
            const result = Object.keys(response.data).map(i => response.data[i])
            //if game exists set exists to true
            values.exists = result.find(item => item.fullName === newPlayer.fullName);
            if(values.exists){
                values.message = 'That player already exists.'
                setSubmitting(false)
            } else {
                //if game does not exist set exist to false and save new game 
                values.exist = false;
                axios.post( '/players.json', newPlayer) //?auth=' + token, gameData )
                .then( response => {
                    setErrors({firstName: newPlayer.fullName +  ' was added.'})
                    setSubmitting(false)
                } )
                .catch( error => {
                    setErrors({firstName: newPlayer.fullName +  ' was NOT added'})
                    setSubmitting(false)
                } );
            }

        } )
        .catch( error => {
            setSubmitting(false)
            setErrors({firstName: newPlayer.fullName + ' error while checking if player exists'})
        } );
    }
})(newPlayerForm)

export default FormikNewPlayerForm
