import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';


class DropdownMenuItem extends Component {
    state = {
        dropdownOpen: false
    }
    
    
    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    
    render () {
        
        return (
           
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle color="Danger" nav caret>
                    Administration
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem><NavLink to="/newgame">New Game</NavLink></DropdownItem>
                    <DropdownItem><NavLink to="/newplayer">New Player</NavLink></DropdownItem>
                    <DropdownItem><NavLink to="/newteam">New Team</NavLink></DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><NavLink to="/importhistory">Import Scores</NavLink></DropdownItem>
                    <DropdownItem><NavLink to="/updatehistory">Update Scores</NavLink></DropdownItem>

                </DropdownMenu>
                </Dropdown>
          
        )
    }
}


            // <Route path="/scorecard" component={ScoreCard} />
            // <Route path="/rplay" component={RegisteredGame} />
            // <Route path="/uplay" component={UnregisteredGame} />



export default DropdownMenuItem