import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select'

import classes from './SelectGame.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { checkValidity} from '../../../Shared/utility';

class RegisteredGame extends Component {
    state = {
        formIsValid: false,
        selectedGame: '',
        selectedTeam: '',
        gameOptionTouched: false,
        teamOptionTouched: false
    }

    handleChange = (selectedOption, optionMeta) => {
        // console.log(selectedOption, 'SELECTED OPTION')
        // console.log(optionMeta.name, 'OPTION META NAME')
        switch(optionMeta.name){
            case "selectedGame":
                // this.setState({ selectedGame: selectedOption.value })
                if(checkValidity(selectedOption.value, {changed: true})){
                    this.setState(
                        {
                            selectedGame: selectedOption.value, 
                            gameOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                            // console.log(this.state, 'UPDATED STATE')
                        })
                }
                break
            case "selectedTeam":
                // console.log(selectedOption.value.toString())
                if(checkValidity(selectedOption.value.toString(), {changed: true})){
                    this.setState(
                        {
                            selectedTeam: selectedOption.value, 
                            teamOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                            // console.log(this.state, 'UPDATED STATE')
                        })
                }
                break
            default:
                console.log('ERROR - SELECTED OPTION OUT OF RANGE')
        }
        // console.log(this.state, 'UPDATED STATE')
    }

    registedGamePlayHandler = (event) => {
        event.preventDefault();
        const firstNames = []
        this.state.selectedTeam.map(item => {
            return firstNames.push(item.split(' ')[0])
        })
        console.log(firstNames)
        const scoreCard = {
            game: this.state.selectedGame,
            players: firstNames,
            registered: this.props.registered
        }
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
        this.props.onFetchGames(this.props.tokenId, this.props.userId) 
        this.setState({games: this.props.games})
        this.props.onFetchTeams(this.props.tokenId, this.props.userId)
      }

    render() {
        // console.log(this.props.games, 'PROPS GAMES')
        // console.log(this.props.teams, 'PROPS TEAMS')
        // console.log(this.state.selectedGame, 'STATE SELECTED GAME')
        // console.log(this.state.selectedTeam, 'STATE SELECTED TEAM')
        
        const gameOptions = []
        this.props.games.map((item, index) => {
            gameOptions.push({value: item.game, label: item.game})
            return gameOptions
        })
        const teamOptions = []
        this.props.teams.map((item, index) => {
            teamOptions.push({value: item.team, label: item.team})
            return teamOptions
        })

        let form = (
            <form onSubmit={this.registedGamePlayHandler}> 
            <div>
                <Select
                    name="selectedGame"
                    placeholder="...select a game"
                    value={this.selectedOption}
                    onChange={this.handleChange}
                    options={gameOptions}
                />
            </div>
            <div>
                <Select
                    name="selectedTeam"
                    placeholder="...select a team"
                    value={this.selectedOption}
                    onChange={this.handleChange}
                    options={teamOptions}
                />
            </div>
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
                <p>{this.state.selectedGame} {this.state.selectedTeam}</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
        // player: state.scoreCard.players,
        registered: state.scoreCard.registered,

        games: state.games.games,
        teams: state.teams.teams,
        // players: state.teams.plist,
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
 