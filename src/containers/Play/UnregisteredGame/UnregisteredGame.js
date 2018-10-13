import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './UnregisteredGame.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';

class UnregisteredGame extends Component {
    state = {
        unregisteredGameForm: {
            
            gameName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '...enter game name'
                },
                value: '',
                validation: {
                    reguired: true
                },
                valid: false,
            },
            players: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '...enter player name\'s'
                },
                value: [],
                validation: {
                    reguired: true
                },
                valid: false,
            },
        },
        formIsValid: false,
        redirect: false
    }
    
    checkValidity(value, rules) {
        //console.log(value, rules);
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if(rules.changed) {
            isValid = value.includes('...chose a');
        }
        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //alert('inputChangeHandler called');
        //console.log(event, inputIdentifier);
        const updatedSelectGameForm = {
            ...this.state.unregisteredGameForm
        };
        const updatedFormElement = { 
            ...updatedSelectGameForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;

        //console.log(updatedFormElement.value);
        //console.log(updatedFormElement.validation);
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation.changed);
        //console.log(updatedFormElement.valid);
        updatedSelectGameForm[inputIdentifier] = updatedFormElement;
        
        const formIsValid = updatedSelectGameForm['gameName'].valid && updatedSelectGameForm['players'].valid;
        //console.log(formIsValid);
        this.setState({unregisteredGameForm: updatedSelectGameForm, formIsValid: formIsValid});
        //console.log(this.state);
    }

    unregistedGamePlayHandler = (event) => {
        event.preventDefault();
        const playersArray = this.state.unregisteredGameForm.players.value.split(' ');
        const scoreCard = {
            game: this.state.unregisteredGameForm.gameName.value,
            players: playersArray,
            registered: false
        }
        //console.log(scoreCard);
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.unregisteredGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.unregisteredGameForm[key]
            });
        }
        let form = (
            <form onSubmit={this.unregistedGamePlayHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                {/* <Button btnType="Danger">CANCEL</Button> */}
                <Button btnType="Success" disabled={!this.state.formIsValid}>CONTINUE TO SCORECARD</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.SelectGame}>
                <h1>Play</h1>
                <h4>Unregistered Game</h4>
                <p className={classes.Instructions}>Enter a game name, then players first name seperated by a comma or space.</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
        players: state.scoreCard.players,
        registered: state.scoreCard.registered
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewScoreCard: (scoreCard) => dispatch(actions.makeScoreCard(scoreCard)),
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(UnregisteredGame);