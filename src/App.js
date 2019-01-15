import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import NewGame from './containers/Admin/NewGame/NewGame';
import RegisteredGame from './containers/Play/RegisteredGame/RegisteredGame';
import NewTeam from './containers/Admin/NewTeam/NewTeam';
import NewPlayer from './containers/Admin/NewPlayer/NewPlayerForm';
import UnregisteredGame from './containers/Play/UnregisteredGame/UnregisteredGame';
import ScoreCard from './containers/Play/ScoreCard/ScoreCard';
import ImportGameHistory from './containers/Admin/ImportGameHistory/ImportGameHistoryFormik';
import UpdateGameHistory from './containers/Admin/UpdateGameHistory/UpdateGameHistory'
import Logout from './containers/Auth/Logout/Logout';
import Home from './components/Home/Home';

import * as action from './store/actions/index';


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSighup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/uplay" component={UnregisteredGame} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/scorecard" component={ScoreCard} />
        <Route path="/" component={Home} />
       
        </Switch>
    );

    if(this.props.isAuthenticated) {
      //alert(this.props.isAuthenticated);
      routes = (
        <Switch>
            <Route path="/importhistory" component={ImportGameHistory} />
            <Route path="/updatehistory" component={UpdateGameHistory} />
            <Route path="/scorecard" component={ScoreCard} />
            <Route path="/newplayer" component={NewPlayer} />
            <Route path="/newteam" component={NewTeam} />
            <Route path="/newgame" component={NewGame} />
            <Route path="/rplay" component={RegisteredGame} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
          </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
          {/* <Switch>
            <Route path="/importhistory" component={ImportGameHistory} />
            <Route path="/scorecard" component={ScoreCard} />
            <Route path="/newplayer" component={NewPlayer} />
            <Route path="/newteam" component={NewTeam} />
            <Route path="/newgame" component={NewGame} />
            <Route path="/rplay" component={RegisteredGame} />
            <Route path="/uplay" component={UnregisteredGame} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" component={Logout} /> 
          </Switch> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken != null 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSighup: () => dispatch(action.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
