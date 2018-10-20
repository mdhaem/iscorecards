import React, {Component} from  'react';
import {connect} from 'react-redux';

import classes from './NewGame.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import {updateObject, checkValidity} from '../../../Shared/utility'

class NewGame extends Component {
    state = {
        newGameForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter New Game Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            hands: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: 8,
                validation: {
                    isNumeric: true
                },
                valid: true
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.newGameForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.newGameForm[inputIdentifier]),
            touched: true
        });

        const updatedNewGameForm = updateObject(this.state.newGameForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedNewGameForm) {
            formIsValid = updatedNewGameForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({newGameForm: updatedNewGameForm, formIsValid: formIsValid});
    }

    createOptions = () => {
        const handOptions = [];
        for (let i = 1; i < 13; i++) { 
            handOptions.push({value: i, displayValue: i});
        } 
        return handOptions;
    }
        
    componentDidMount() {
        const newState = this.state;
        newState.newGameForm.hands.elementConfig.options = this.createOptions();
        this.setState({newGameForm: newState.newGameForm});
    }

    addGameHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.newGameForm) {
            formData[formElementIdentifier] = this.state.newGameForm[formElementIdentifier].value;
        }
        const newGame = {
            user: this.props.user,
            game: this.state.newGameForm.name.value,
            hands: this.state.newGameForm.hands.value
        }
        
        this.props.onAddGame(newGame, this.props.token);
        
    }

    render() {
        
        const formElementsArray = [];
        for (let key in this.state.newGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.newGameForm[key]
            });
        }
        let form = (
            <form onSubmit={this.addGameHandler}>
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
                <Button btnType="Danger">CANCEL</Button>
                <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.NewGame}>
                <h1>New Game</h1>
                <p className={classes.Instructions}>Enter the new game name and expected number of hands. 
                Additional hands can always be added once the score card is displayed.</p>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
            user: state.auth.localId,
            token: state.auth.idToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddGame: (newGame) => dispatch(actions.addGame(newGame, newGame.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (NewGame);