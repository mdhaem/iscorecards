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
        switch(optionMeta.name){
            case "selectedGame":
                if(checkValidity(selectedOption.value, {changed: true})){
                    this.setState(
                        {
                            selectedGame: selectedOption.value, 
                            gameOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                        })
                }
                break
            case "selectedTeam":
                if(checkValidity(selectedOption.value.toString(), {changed: true})){
                    this.setState(
                        {
                            selectedTeam: selectedOption.value, 
                            teamOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                        })
                }
                break
            default:
                console.log('ERROR - SELECTED OPTION OUT OF RANGE')
        }
    }

    getFirstNames = (namesArray) => {
        const firstNames = []
        namesArray.map(item => {
            return firstNames.push(item.split(' ')[0])
        })

        return firstNames
    }

    getFirstNamesFromTeamsProps = (propsArray) => {
        let names = []
        const teamFirstNames = []

        propsArray.map((item) => {
            names = []
            item.team.map( team => {
                return names.push(team.split(' ')[0])
            })
            teamFirstNames.push(names)
        })

        return teamFirstNames
    }

    registedGamePlayHandler = (event) => {
        event.preventDefault();
        const scoreCard = {
            game: this.state.selectedGame,
            players: this.getFirstNames(this.state.selectedTeam),
            registered: this.props.registered
        }
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
        this.props.onFetchGames(this.props.tokenId, this.props.userId) 
        this.props.onFetchTeams(this.props.tokenId, this.props.userId)
      }

    render() {
        const gameOptions = []
        this.props.games.map((item, index) => {
            gameOptions.push({value: item.game, label: item.game})
            return gameOptions
        })
        const teamOptions = []
        let teamsFirstNames = []
        
        this.props.teams.length > 1 ?
            teamsFirstNames = this.getFirstNamesFromTeamsProps(this.props.teams) : null

        teamsFirstNames.map((item, index) => {
            teamOptions.push({value: item, label: item.toString().replace(/,/g, ', ')})
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
        registered: state.scoreCard.registered,

        games: state.games.games,
        teams: state.teams.teams,
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
 