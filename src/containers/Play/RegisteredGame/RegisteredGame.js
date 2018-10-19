import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './SelectGame.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import {checkValidity} from '../../../Shared/utility';

class RegisteredGame extends Component {
    state = {
        registeredGameForm: {
            
            games: {
                elementType: 'select',
                elementConfig: {
                    options: []
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegisteredGameForm = {
            ...this.state.registeredGameForm
        };
        const updatedFormElement = { 
            ...updatedRegisteredGameForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation.changed);
        updatedRegisteredGameForm[inputIdentifier] = updatedFormElement;
        
        const formIsValid = updatedRegisteredGameForm['games'].valid && updatedRegisteredGameForm['teams'].valid;
        this.setState({registeredGameForm: updatedRegisteredGameForm, formIsValid: formIsValid});
    }

    registedGamePlayHandler = (event) => {
        event.preventDefault();
        const game = this.state.registeredGameForm.games.value;
        const team = this.state.registeredGameForm.teams.value;
        const scoreCard = {
            game: game,
            players: team.split(','),
            registered: this.props.registered
        }
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
        const newState = this.state;
        this.props.onFetchGames(this.props.tokenId, this.props.userId);
        this.props.onFetchTeams(this.props.tokenId, this.props.userId);
        
        if(this.props.games){
            let gameOptions = [];
            gameOptions.push( {value: '...chose a game', displayValue: '...chose a game'} );
            this.props.games.map((item, index) => {
                gameOptions.push( { value:item.game, displayValue: item.game} );
                return gameOptions;
            })
            newState.registeredGameForm.games.elementConfig.options = gameOptions;
        }

        if(this.props.players){
            let playersOptions = [];
            playersOptions.push( {value: '...chose a team', displayValue: '...chose a team'} );
            this.props.team.map((item, index) => {
                playersOptions.push( { value:item.player, displayValue: item.player} );
                return playersOptions;
            })
            newState.registeredGameForm.teams.elementConfig.options = playersOptions;
        }
   
        this.setState({state: newState});
      }

    render() {
        const formElementsArray = [];
        for (let key in this.state.registeredGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registeredGameForm[key]
            });
        }

        let form = (
            <form onSubmit={this.registedGamePlayHandler}>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>CONTINUE TO SCORECARD</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.SelectGame}>
                <h1>Play</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
        player: state.scoreCard.players,
        registered: state.scoreCard.registered,

        games:state.games.games,
        players: state.teams.plist,
        tokenId: state.auth.idToken,
        userId: state.auth.localId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewScoreCard: (scoreCard) => dispatch(actions.makeScoreCard(scoreCard)),
        onAddGameResult: (scoreCard) => dispatch(actions.addGameResult(scoreCard)),
        onFetchGames: (tokenId, userId) => dispatch( actions.initGames(tokenId, userId)),
        onFetchTeams: (tokenId, userId) => dispatch( actions.initTeams(tokenId, userId)),
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(RegisteredGame);
 