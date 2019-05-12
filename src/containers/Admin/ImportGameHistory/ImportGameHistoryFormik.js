import React from 'react';
import * as Yup from 'yup';
import * as moment from 'moment'
import { withFormik, Form, Field, FieldArray } from 'formik';
import axios from '../../../store/axios-data'
import DatePicker from '../../../components/UI/DatePicker/DatePicker'; 

import classes from './ImportGameHistory.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import MyDatePicker from './MyDatePicker'

const queryParams = '?orderBy="user"&equalTo="' + localStorage.getItem('userId') + '"';
const gOptions = []
const gameOptions = () => {
    axios.get( '/games.json' + queryParams)
        .then( response => {
            Object.keys(response.data).map(i => gOptions.push(response.data[i]))
console.log(response.data)
            return gOptions;
        } )
        .catch( error => {
            console.log(error);
        } );
        console.log(gOptions)

}
//gameOptions();

const tOptions = []
const teamOptions = () => {
    axios.get( '/teams.json' + queryParams)
        .then( response => {
            Object.keys(response.data).map(i => tOptions.push(response.data[i]))

            return tOptions
        } )
        .catch( error => {
            console.log(error);
        } );
    console.log(tOptions)
    
}
//teamOptions()


const gameHistoryForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue
}) => {
    return ( 
        <div className={classes.ImportGameHistory}>
        <h1>Import Game History</h1>
        <p className={classes.Instructions}>Select date, game, team, and scores for previously played games.</p>
        <Form>
            {isSubmitting ? <Spinner /> : null}
            {errors.gameName && <p>{errors.gameName}</p>}

            <div>
                <label className={classes.ScoresDate}>Date</label>
                
                <MyDatePicker 
                    value={values.scoresDate}
                    onChange={setFieldValue}
                    errors={errors.scoresDate}                  
                    selected={values.scoresDate}
                    touched={touched.scoresDate}/>
                   
            </div>
            <div>
                <label>Game</label>
                <Field component="select" name="game" className={classes.Input}>
                    <option key="selectTeam" value="selectTeam">...select game</option>
                    {gOptions.map(item => {
                        return <option key={item.game}>{item.game}</option>
                    })}
                </Field>
            </div>
            <div>
                <label>Team</label>
                <Field component="select" name="team" className={classes.Input}>
                    <option key="selectTeam" value="selectTeam">...select team</option>
                    {tOptions.map((team, index) => {
                        let firstName = '';
                        team.team.map((name) => {
                            firstName = firstName + ' ' + name.split(' ')[0];
                            return firstName;
                        })
                        return <option key={index} value={team.team}>{firstName}</option>
                    })}
                </Field>
            </div>
            <div>
            <FieldArray
            name="scores"
            render={arrayHelpers => (
                values.team !== '...select team' && values.team.split(",") && values.team.split(",").length > 0 ? (
                values.team.split(",").map((team, index) => (
                    <div key={index}>
                        <label className={classes.ScoreInputLabel}>{team.split(' ')[0]}</label>
                        <Field 
                            className={classes.ScoreInput}
                            type="number" 
                            name={`scores.${index}`}
                            onChange={handleChange}
                            />
                    </div>
                ))
                ) : null
                // {console.log(values)}
            )}/>
            </div>
            <Button btnType="Success" type="submit" disabled={isSubmitting}>Save Game History</Button>
        </Form>
        </div>
    )
}

const FormikNewGameForm = withFormik({
    mapPropsToValues({ game, team, scores, scoresDate, gameNumber }) {
        return {
            game: '',
            team: '',
            scores: [],
            exists: false,
            scoresDate: moment(new Date()).format('MM-DD-YYYY'),
            gameNumber: 1,
            gOptions: gameOptions(),
            tOptions: teamOptions()
            
        }
    },
    validationSchema: Yup.object().shape({
        // game: Yup.required('Gamr name is required.')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, setFieldValue } ) {
        const newHistory = {
            user: localStorage.getItem('userId'),
            scoresDate: moment(values.scoresDate).format('MM-DD-YYYY'),
            game: values.game,
            team: values.team,
            scores: values.scores,
            gameNumber: values.gameNumber
        }
console.log(newHistory)
        //get all games for user
        const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + newHistory.user + '"';
        axios.get( '/history.json' + queryParams).then( response => {
            console.log(response)
            const result = Object.keys(response.data).map(i => response.data[i])
            console.log(result)
            //if game exists set exists to true
            values.exists = result.find(item => item.game === newHistory.game 
                && item.scoresDate === newHistory.scoresDate
                && item.team === newHistory.team);
            if(values.exists){
                // setErrors({ gameName: 'That game history already exists.'})
                // setSubmitting(false)
                newHistory.gameNumber = newHistory.gameNumber + 1
                // ({field: "gameNumber", value: (values.GameNumber + 1), shouldValidate?: false}) => void
            } 
            // else {
                //if game does not exist set exist to false and save new game 
                values.exist = false;
                axios.post( '/history.json', newHistory) //?auth=' + token, gameData )
                .then( response => {
                    setErrors({gameName: 'Game ' + newHistory.gameNumber + ' of ' + newHistory.game + ' played on '+ newHistory.scoresDate + ' was added.'})
                } )
                .catch( error => {
                    setErrors({gameName: newHistory.game + ' played on '+ newHistory.scoresDate + ' was NOT added'})
                } );
                setSubmitting(false)
                // resetForm()
            // }

        } )
        .catch( error => {
            setErrors({gameName: newHistory.game + ' error while checking if game exists'})
            console.log( 'ERROR', error ) ;
        } );
    }
})(gameHistoryForm)

export default FormikNewGameForm
