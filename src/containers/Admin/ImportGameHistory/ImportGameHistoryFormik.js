import React from 'react';
import * as Yup from 'yup';
import * as moment from 'moment'
import { withFormik, Form, Field, FieldArray } from 'formik';
import axios from '../../../store/axios-data'
import DatePicker from '../../../components/UI/DatePicker/DatePicker';
import { Datepicker } from 'react-formik-ui'
 


import classes from './ImportGameHistory.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import MyDatePicker from './MyDatePicker'

const gOptions = []
const gameOptions = () => {
    // const options = [{game: 'select a game'}]
    const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + localStorage.getItem('userId') + '"';
    axios.get( '/games.json' + queryParams)
        .then( response => {
            // console.log('response.data',response.data);
            // const options = [{game: 'select a game'}]
            Object.keys(response.data).map(i => gOptions.push(response.data[i]))
            // console.log(gOptions);

            return gOptions;
        } )
        .catch( error => {
            console.log(error);
        } 
    );
}
gameOptions();

const tOptions = []
const teamOptions = () => {
    const queryParams = '?orderBy="user"&equalTo="' + localStorage.getItem('userId') + '"';
    axios.get( '/teams.json' + queryParams)
        .then( response => {
            // console.log('response.data',response.data);
            Object.keys(response.data).map(i => tOptions.push(response.data[i]))
            // console.log(tOptions);

            return tOptions
        } )
        .catch( error => {
            console.log(error);
        } );
    console.log(tOptions)
    
}
teamOptions()


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
                // {
                values.team !== '...select team' && values.team.split(",") && values.team.split(",").length > 0 ? (
                values.team.split(",").map((team, index) => (
                    <div key={index}>
                        <label className={classes.ScoreInputLabel}>{team.split(' ')[0]}</label>
                        <Field 
                            className={classes.ScoreInput}
                            type="number" 
                            name={`scores.${index}`}
                            // value=""  
                            // placeholder={`team.${index}`} 
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
    mapPropsToValues({ game, team, scores, scoresDate }) {
        return {
            game: '',
            team: '',
            scores: [],
            exists: false,
            scoresDate: new Date()
            
        }
    },
    validationSchema: Yup.object().shape({
        // game: Yup.required('Gamr name is required.')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting } ) {
        const newHistory = {
            user: localStorage.getItem('userId'),
            scoresDate: moment(values.scoresDate).format('MM-DD-YYYY'),
            game: values.game,
            team: values.team,
            scores: values.scores
        }
console.log(newHistory)
        //get all games for user
        const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + newHistory.user + '"';
        axios.get( '/history.json' + queryParams).then( response => {
            console.log(response)
            const result = Object.keys(response.data).map(i => response.data[i])
            console.log(result)
            //if game exists set exists to true
            values.exists = result.find(item => item.game === newHistory.game && item.scoresDate === newHistory.scoresDate);
            if(values.exists){
                setErrors({ gameName: 'That game history already exists.'})
                setSubmitting(false)
            } else {
                //if game does not exist set exist to false and save new game 
                values.exist = false;
                axios.post( '/history.json', newHistory) //?auth=' + token, gameData )
                .then( response => {
                    setErrors({gameName: newHistory.game + ' played on '+ newHistory.scoresDate + ' was added.'})
                } )
                .catch( error => {
                    setErrors({gameName: newHistory.game + ' played on '+ newHistory.scoresDate + ' was NOT added'})
                } );
                setSubmitting(false)
                // resetForm()
            }

        } )
        .catch( error => {
            setErrors({gameName: newHistory.game + ' error while checking if game exists'})
            console.log( 'ERROR', error ) ;
        } );
    }
})(gameHistoryForm)

export default FormikNewGameForm
