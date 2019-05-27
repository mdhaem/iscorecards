import React from 'react';
import * as Yup from 'yup';
import * as moment from 'moment'
import { withFormik, Form, Field, FieldArray } from 'formik';
import axios from '../../../store/axios-data' 

import classes from './UpdateGameHistory.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'

const queryParams = '?orderBy="user"&equalTo="' + localStorage.getItem('userId') + '"';

const gHistory = []
const history = () => {
    // const options = [{game: 'select a game'}]
    //const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="userId"&equalTo="' + localStorage.getItem('userId') + '"';
    axios.get( '/history.json' + queryParams)
        .then( response => {
            Object.keys(response.data).map(i => gHistory.push(response.data[i]))

            return gHistory;
        } )
        .catch( error => {
            console.log(error);
        } 
    );
}

const gameHistoryForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue
}) => {
    const gameDates = gHistory.map((item, index) => {
        return <option key={index}>{item.scoresDate}</option>
    })

    const games = gHistory.map((item, index) => {
        if (item.scoreDate === values.scoreDate) {
            return <option key={index}>{item.game}</option>
        }
    })

    return ( 
        <div className={classes.ImportGameHistory}>
        <h1>Update Game History</h1>
        <p className={classes.Instructions}>Select date, game, team, and scores for previously played games.</p>
        <Form>
            {isSubmitting ? <Spinner /> : null}
            {errors.gameName && <p>{errors.gameName}</p>}
            <div>
                <label>Date</label>
                <Field component="select" name="scoreDate" className={classes.Input}>
                    <option key="selectDate" value="selectDate">...select date</option>
                    {/* {gHistory.map((item, index) => {
                        return <option key={index}>{item.scoresDate}</option>
                    })} */}
                    {gameDates}
                </Field>
            </div>
            <div>
                <label>Game</label>
                <Field component="select" name="game" className={classes.Input}>
                    <option key="selectTeam" value="selectTeam">...select game</option>
                    {/* {gHistory.map((item, index) => {
                        if (item.scoreDate === values.scoreDate) {
                            return <option key={index}>{item.game}</option>
                        }
                    })} */}
                    {games}
                </Field>
            </div>
            <div>
                <label>Team</label>
                <Field component="select" name="team" className={classes.Input}>
                    <option key="selectTeam" value="selectTeam">...select team</option>
                    {gHistory.map((team, index) => {
                        let names = team.team.split(",")
                        console.log(names)
                        let firstName = ''
                        names.map((name) => {
                            firstName = firstName + ' ' + name.split(' ')[0];
                            return firstName;
                        })
                        return <option key={index} value={team.team}>{firstName}</option>
                    })}
                </Field>
            </div>
            <div>
                <label>Number</label>
                <Field component="select" name="number" className={classes.Input}>
                    <option key="selectDate" value="selectDate">...select game Number</option>
                    {gHistory.map((item, index) => {
                        return <option key={index}>{item.gameNumber}</option>
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
                            onChange={handleChange}
                            
                            />
                    </div>
                ))
                ) : null
            )}/>
            </div>
            <Button btnType="Success" type="submit" disabled={isSubmitting}>Save Game History</Button>
        </Form>
        </div>
    )
}

const UpdateGameForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ game, team, scores, scoresDate }) {
        return {
            game: '',
            team: '',
            scores: [],
            exists: false,
            scoresDate: moment(new Date()).format('MM-DD-YYYY'),
            gHistory: history()

            
        }
    },
    validationSchema: Yup.object().shape({
        //scoresDate: Yup.required('Gamr name is required.')
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

export default UpdateGameForm
