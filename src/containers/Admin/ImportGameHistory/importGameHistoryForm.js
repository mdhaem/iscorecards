import React from 'react';
import { Field, reduxForm } from 'redux-form';

import * as classes from './ImportGameHistory.css';
//import Auxx from '../../../hoc/Auxx/Auxx';

const FormCode = props => {
  const { error, handleSubmit, pristine, reset, submitting, changed=[] } = props
  console.log(props.gamesOptions);
  return (
    <form onSubmit={handleSubmit}>
      <div>
          <label className={classes.ImportGameHistoryLabel}>Game </label>
          <Field className={classes.Input} 
            name="game" 
            label="Games"
            component="select" 
            onChange={props.changed} >
            <option key="selectGame" value="selectGame">...select game</option>
            {props.gameOptions.map((game, index) => {
              return <option key={index} value={game.game}>{game.game}</option>
            })}
          </Field>
      </div>
      <div >
        <label className={classes.ImportGameHistoryLabel}>Team </label>
        <Field className={classes.Input} 
          name="team" 
          label="Teams"
          component="select" 
          onChange={props.changed} >
          <option key="selectTeam" value="selectTeam">...select team</option>
          {props.teamOptions.map((team, index) => {
              const namesArray = team.team;
              let firstName = '';
              namesArray.map((name) => {
                firstName = firstName + ' ' + name.split(' ')[0];
                return firstName;
              })
            return <option key={index} value={firstName}>{firstName}</option>
          })}

        </Field>
      </div>
      <div>
        <table>
        { props.changed.map((players, idx) => (
             
            <tr>
            <div key={idx}>
            <td width="70%"><label className={classes.ScoreInputLabel}>{players.player}:</label></td>
            <td>
              <input
                className={classes.ScoreInput}
                type="number"
                placeholder={0}
                value={players.name}
                //onChange={this.handleShareholderNameChange(idx)}
              />
              </td>
            </div>
            </tr>
          ))}
          </table>
      </div>
        {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          SAVE
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          CANCEL
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'importGameHistoryForm' // a unique identifier for this form
})(FormCode)