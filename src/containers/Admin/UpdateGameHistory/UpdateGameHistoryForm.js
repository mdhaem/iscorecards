import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './UpdateGameHistory.css';

let FormCode = props => {
    const {
      handleSubmit,
    } = props
  
    return (
      <form onSubmit={handleSubmit}>
        <div >
          <label className={classes.InputLabel}>Games List </label>
          <Field className={classes.Input} 
            name="game" 
            component="select" 
            onChange={props.changed} >
  
            {props.gameOptions.map((game, index) => {
                console.log(game)
              return <option key={index} value={game.game}>{game.game}</option>
            })}
          </Field>
          <label className={classes.InputLabel}>Game Date </label>
          <Field className={classes.Input} 
            name="date" 
            component="select" 
            onChange={props.changed} >
  
            {/* {props.options.map((player, index) => {
              return <option key={index} value={player.value}>{player.displayValue}</option>
            })} */}
          </Field>
          <label className={classes.InputLabel}>Game Team </label>
          <Field className={classes.Input} 
            name="team" 
            component="select" 
            onChange={props.changed} >
  
            {/* {props.options.map((player, index) => {
              return <option key={index} value={player.value}>{player.displayValue}</option>
            })} */}
          </Field>
          <label className={classes.InputLabel}>Which Game</label>
          <Field className={classes.Input} 
            name="number" 
            component="select" 
            onChange={props.changed} >
  
            {/* {props.options.map((player, index) => {
              return <option key={index} value={player.value}>{player.displayValue}</option>
            })} */}
          </Field>
        </div>
      </form>
    )
  }
  
  FormCode = reduxForm({
    form: 'updateGameHistory' 
  })(FormCode)
  
  export default FormCode;