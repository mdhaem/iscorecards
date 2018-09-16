import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import NewGame from './containers/Admin/NewGame/NewGame';
import RegisteredGame from './containers/Play/RegisteredGame/SelectGame';
import NewTeam from './containers/Admin/NewTeam/NewTeam';
import NewPlayer from './containers/Admin/NewPlayer/NewPlayer';
import UnregisteredGame from './containers/Play/UnregisteredGame/UnregisteredGame';
import ScoreCard from './containers/Play/ScoreCard/ScoreCard';
import ImportGameHistory from './containers/Admin/ImportGameHistory/ImportGameHistory';
import Logout from './containers/Auth/Logout/Logout';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/importhistory" component={ImportGameHistory} />
            <Route path="/scorecard" component={ScoreCard} />
            <Route path="/newplayer" component={NewPlayer} />
            <Route path="/newteam" component={NewTeam} />
            <Route path="/newgame" component={NewGame} />
            <Route path="/rplay" component={RegisteredGame} />
            <Route path="/uplay" component={UnregisteredGame} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" component={Logout} />
            
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
