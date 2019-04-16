import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select'
import DatePicker from '../../../components/UI/DatePicker/DatePicker';

import classes from './ImportGameHistory.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { checkValidity, getUniqueGameNamesFromTeamProps, getFirstNamesFromTeamsProps } from '../../../Shared/utility';
import GameScoreHistory from './importGameHistoryScores/importGameHistoryScores'

class RegisteredGame extends Component {
    state = {
        formIsValid: false,
        selectedGame: '',
        selectedTeam: '',
        gameOptionTouched: false,
        teamOptionTouched: false
    }

    // getHandsFromSelectedGame = (selectedGame) => {
    //     // console.log(this.props.games)
    //     // console.log(this.props.games.find(x => x.b === selectedGame.game))
    //     return this.props.games.find(x => x.b === selectedGame.game).hands
    // }

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
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
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
                width: 100,
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

          const onChangeFct = () => console.log("onChange usually handled by redux");
        
        const data = [
            {name: 'Mike',
            score: 0},
            {name: 'Sandy',
            score: 5}
        ]

          const tableColumns = [
            {
                header: 'Id',
                accessor: 'id'
            },
            {
                header: 'Name',
                accessor: 'name',
                render: props => <input value={props.row.name} onChange={onChangeFct} />
            },
            {
                header: 'Score',
                accessor: 'score',
                render: props => <input value={props.row.name} onChange={onChangeFct} />
            }
        ]


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
            <div>{this.state.selectedTeam.length > 0 ? <GameScoreHistory team={this.state.selectedTeam}/> : null}</div>
                <Button btnType="Danger">CANCEL</Button>
                <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <React.Fragment>

            <div className={classes.ImportGameHistory}>
                <h1>Import Scores</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                <DatePicker selected={this.props.date} onChange={this.handleChange} />

                <p>{this.state.selectedGame} {this.state.selectedTeam}</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {form}
                {/* <div>{this.state.selectedTeam.length > 0 ? <GameScoreHistory team={this.state.selectedTeam}/> : null}</div> */}
            </div>

            </React.Fragment>

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
        // onAddGameResult: (scoreCard) => dispatch(actions.addGameResult(scoreCard)),
        onFetchGames: (tokenId, userId) => dispatch( actions.initGames(tokenId, userId)),
        onFetchTeams: (tokenId, userId) => dispatch( actions.initTeams(tokenId, userId)),
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(RegisteredGame);
 