import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select'
import _ from 'lodash'

import classes from './SelectGame.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { checkValidity, getUniqueGameNamesFromTeamProps, getFirstNamesFromTeamsProps, getUniqueArray } from '../../../Shared/utility';

class RegisteredGame extends Component {
    state = {
        formIsValid: false,
        selectedGame: '',
        selectedTeam: '',
        gameOptionTouched: false,
        teamOptionTouched: false
    }

    getHandsFromSelectedGame = (selectedGame) => {
        // console.log(selectedGame)
        // console.log(this.props.games)
        // console.log(this.props.games.find(x => x.b === selectedGame.game))
        const gamesUnique = getUniqueArray(this.props.games)
        // console.log(gamesUnique)
        // console.log(gamesUnique.find(x => x.game === selectedGame.game).hands)
        // console.log(_.find(gamesUnique, function(o) { return o.game === selectedGame }))
        return _.find(gamesUnique, function(o) { return o.game === selectedGame }).hands
    }

    handleChange = (selectedOption, optionMeta) => {
        // console.log(selectedOption)
        // console.log(optionMeta)
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

    registedGamePlayHandler = (event) => {
        event.preventDefault();
        const scoreCard = {
            game: this.state.selectedGame,
            players: this.state.selectedTeam,
            hands: this.getHandsFromSelectedGame(this.state.selectedGame),
            registered: this.props.registered
        }
        console.log(scoreCard)
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
        console.log(localStorage.getItem("token"))
        console.log(this.props.tokenId)
        console.log(localStorage.getItem("userId"))
        console.log(this.props.userId)
        // this.props.onFetchGames(localStorage.getItem("tokenId"), localStorage.getItem("userId")) 
        this.props.onFetchGames(this.props.tokenId, this.props.userId) 
        this.props.onFetchTeams(this.props.tokenId, this.props.userId)
        
      }

    render() {
        let uniqueGames = []
        this.props.teams.length > 1 ?
            uniqueGames = getUniqueGameNamesFromTeamProps(this.props.games) : uniqueGames = []

        const gameOptions = []
        uniqueGames.map((item) => {
            gameOptions.push({value: item, label: item})
            return gameOptions
        })

        let noGameOptions = false
        // gameOptions.length === 0 ? noGameOptions = true : null
        
        let teamsFirstNames = []
        this.props.teams.length > 1 ?
            teamsFirstNames = getFirstNamesFromTeamsProps(this.props.teams) : teamsFirstNames = []

        const teamOptions = []
        teamsFirstNames.map((item, index) => {
            teamOptions.push({value: item, label: item.toString().replace(/,/g, ', ')})
            return teamOptions
        })

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                width: 400,
                padding: 0,
            }),
            control: (provided, state) => ({
                ...provided,
                padding: 0,
                
                width: 400,
                align: 'center',
                margin: 'auto',
                marginBottom: 10,
            }),
            singleValue: (provided, state) => {
              return { ...provided };
            }
          }

        let form = (
            <form onSubmit={this.registedGamePlayHandler}> 
            <div>
                <Select
                    styles={customStyles}
                    name="selectedGame"
                    placeholder="...select a game"
                    value={this.selectedOption}
                    onChange={this.handleChange}
                    options={gameOptions}
                />
            </div>
            <div>
                <Select
                    styles={customStyles}
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
                {noGameOptions?<Redirect to="/newgame"/>:null}
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
 