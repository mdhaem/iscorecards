import React from 'react';
import {Redirect} from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import axios from '../../../store/axios-data'

import classes from './NewGame.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'

const createOptions = () => {
    const handOptions = [];
    for (let i = 1; i < 13; i++) { 
        handOptions.push({value: i, displayValue: i});
    } 
    return handOptions;
}

const nameGameForm = ({
    values,
    errors,
    touched,
    isSubmitting
}) => {
    return ( 
        <div className={classes.NewGame}>
        <h1>New Game</h1>
        <p className={classes.Instructions}>Enter the new game name and expected number of hands. 
        Additional hands can always be added once the score card is displayed.</p>
        <Form>
            {isSubmitting ? <Spinner /> : null}
            {values.cancel ? <Redirect to='/'/> : null}
            <div>
                {touched.gameName && errors.gameName && <p>{errors.gameName}</p>}
                <label>Game</label>
                <Field type="text" name="gameName" className={classes.Input} placeholder="Enter new game name..." />
            </div>
            <div>
                <label>Hands</label>
                    <Field component="select" name="hands" className={classes.Input}>
                    {createOptions().map(item => {
                        return <option key={item.displayValue}>{item.displayValue}</option>
                    })}
                    </Field>
                
            </div>
            <Button btnType="Success" type="submit" disabled={isSubmitting}>Save New Game</Button>
        </Form>
        </div>
    )
}

const FormikNewGameForm = withFormik({
    mapPropsToValues({ gameName, gameHands, handss }) {
        return {
            gameName: gameName || '',
            hands: 8,
            exists: false,
            cancel: false
        }
    },
    validationSchema: Yup.object().shape({
        gameName: Yup.string().min(2, 'Game name must be at least 2 charters.').required('Gamr name is required.')
    }),
    handleCancel (values){
        values.cancel = true
    },
    handleSubmit(values, { resetForm, setErrors, setSubmitting } ) {
        const newGame = {
            user: localStorage.getItem('userId'),
            game: values.gameName,
            hands: values.hands
        }

        //get all games for user
        const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + newGame.user + '"';
        axios.get( '/games.json' + queryParams).then( response => {
            const result = Object.keys(response.data).map(i => response.data[i])
            //if game exists set exists to true
            values.exists = result.find(item => item.game === newGame.game);
            if(values.exists){
                setErrors({ gameName: 'That game already exists.'})
                setSubmitting(false)
            } else {
                //if game does not exist set exist to false and save new game 
                values.exist = false;
                axios.post( '/games.json', newGame) //?auth=' + token, gameData )
                .then( response => {
                    setErrors({gameName: newGame.game + ' was added.'})
                } )
                .catch( error => {
                    setErrors({gameName: newGame.game + ' was NOT added'})
                } );
                setSubmitting(false)
                // resetForm()
            }

        } )
        .catch( error => {
            setErrors({gameName: newGame.game + ' error while checking if game exists'})
            console.log( 'ERROR', error ) ;
        } );
    }
})(nameGameForm)

export default FormikNewGameForm
