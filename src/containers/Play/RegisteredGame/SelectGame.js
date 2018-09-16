import React, {Component} from  'react';

import classes from './SelectGame.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class SelectGame extends Component {
    state = {
        selectGameForm: {
            
            games: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a game', displayValue: '...chose a game'},
                        {value: 'Hand and Foot', displayValue: 'Hand and Foot'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false,
            },
            teams: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a team', displayValue: '...chose a team'},
                        {value: 'Mike, Sandy', displayValue: 'Mike, Sandy'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false
            }
        },
        formIsValid: false
    }
    
    checkValidity(value, rules) {
        //console.log(value, rules);
        let isValid = true;
        if (!rules) {
            return true;
        }

        if(rules.changed) {
            isValid = value.includes('...chose a');
        }
        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event, inputIdentifier);
        const updatedSelectGameForm = {
            ...this.state.selectGameForm
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
        
        const formIsValid = updatedSelectGameForm['games'].valid && updatedSelectGameForm['teams'].valid;
        //console.log(formIsValid);
        this.setState({selectGameForm: updatedSelectGameForm, formIsValid: formIsValid});
        //console.log(this.state);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.selectGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.selectGameForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
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
            <div className={classes.SelectGame}>
                <h1>Play</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                {form}
            </div>
        );
    }
}

 export default SelectGame;