import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { UserService } from './service/UserService';
//import { GameService } from './service/GameService';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
//import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';


import 'primereact/resources/themes/lara-dark-purple/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<Singup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="authenticate" element={<Authenticate />} />
            <Route path="lobby" element={<Lobby /> } />
          </Routes>
        </div>
      </>
    );
  }
}
class Home extends Component {
  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto', marginTop: '20px' }}>
        <Panel header="Welcome to the Bingo Game">
          <p>Get ready to start the game! Let us begin.</p>
          <nav>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button style={{ width: '30%', margin: '0 10px 0 0', color: 'white' }} label="Sign Up" />
            </Link>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button style={{ width: '30%', margin: '0 10px 0 0', color: 'white' }} label="Sign In" />
            </Link>
          </nav>
        </Panel>
      </div>
    );
  }
}
class Singup extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: null,
        password: null
      }
    };
    this.userService = new UserService();
    this.register = this.register.bind(this);
  }

  register() {
    this.userService.register(this.state.user).then(data => {
      this.setState({
        user: {
          //id: null,
          email: null,
          password: null
        }
      });
    })
  }

  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto', marginTop: '20px' }}>
        <Panel header="Create Player">
          <h2>JOIN THE BEST BINGO GAME!</h2>
          <form id="user-form">
            <span className="p-float-label">
              <InputText type="email" style={{ width: '100%' }} value={this.state.value} id="email" onChange={(e) => {
                let val = e.target.value;
                console.log(val);
                this.setState(prevState => {
                  let user = Object.assign({}, prevState.user);
                  user.email = val;
                  console.log(user);
                  return { user };
                })
              }} />
              <label htmlFor="email">Email</label>
            </span>
            <br />
            <span className="p-float-label">
              <Password style={{ width: '100%' }} value={this.state.value} id="password" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let user = Object.assign({}, prevState.user);
                  user.password = val;
                  console.log(user);
                  return { user };
                })
              }} />
              <label htmlFor="password">Password</label>
            </span>
            <br />
            <span>
              <Link to="/authenticate" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '40%', color: 'white' }} label="Sign Up" icon="pi pi-check" onClick={this.register} />
              </Link>
            </span>
          </form>
        </Panel>
        <div>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
    );
  }
}

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: null,
        password: null
      }
    };
    this.userService = new UserService();
    this.login = this.login.bind(this);
  }

  login() {
    this.userService.login(this.state.user).then(data => {
      const token = data.token.toString();
      this.userService.getMe(token);
      this.setState({
        user: {
          //id: null,
          email: null,
          password: null,
          token: token
        }
      });
    })
  }

  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto', marginTop: '20px' }}>
        <Panel header="Sign in">
          <form id="login-form">
            <h2>LET'S PLAY THE BEST BINGO GAME!</h2>
            <span className="p-float-label">
              <InputText type="email" style={{ width: '100%' }} value={this.state.value} id="email" onChange={(e) => {
                let val = e.target.value;
                console.log(val);
                this.setState(prevState => {
                  let user = Object.assign({}, prevState.user);
                  user.email = val;
                  console.log(user);
                  return { user };
                })
              }} />
              <label htmlFor="email">Email</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText type="password" style={{ width: '100%' }} value={this.state.value} id="password" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let user = Object.assign({}, prevState.user);
                  user.password = val;
                  console.log(user);
                  return { user };
                })
              }} />
              <label htmlFor="password">Password</label>
            </span>
            <br />
            <span>
              <Link to="/lobby" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '40%', color: 'white' }} label="Sign In" icon="pi pi-check" onClick={this.login} />
              </Link>
            </span>
          </form>
        </Panel>
        <div>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>

    );
  }
}

class Authenticate extends Component {

}

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      game: {
        id: null,
        nplayers: null,
        status: null,
      },
      selectedGame: {

      },
      render: false
    };
    this.items = [
      {
        label: 'New Game',
        icon: 'pi pi-fw pi-plus'
      },
      {
        label: 'Join Game',
        icon: 'pi pi-fw pi-user-plus'
      },
      {
        label: 'Log Out',
        icon: 'pi pi-fw pi-user-minus',
        url: "/",
        command: () => { this.logout() }
      }
    ];
    //this.gameService = new GameService();
    this.userService = new UserService();
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
    this.contactService.getAll().then(data => this.setState({contacts: data}))
    setTimeout(function() { //Start the timer
      this.setState({render: true}) //After 1.2 second, set render to true
  }.bind(this), 1200)
  }

  logout() {
    this.userService.logout().then(data => {
      this.setState({
        user: {
          //id: null,
          email: null,
          password: null,
        }
      });
    })

  }
  render() {
    const token = localStorage.getItem('token');
    const renderUserFound = () => (
      <div>
        <Menubar model={this.items} />
        <br />
        <Panel header="Games">
          <DataTable paginator={true} rows="8" selectionMode="single" selection={this.state.selectedGame} onSelectionChange={e => this.setState({ selectedGame: e.value })}>
            <Column field="id" header="Id"></Column>
            <Column field="nplayers" header="# Players"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </Panel>
      </div>
    )

    const renderNoUserFound = () => (
      <div>
        <Panel header="Acceso denegado">

        </Panel>
      </div>
    )
    if(this.state.render){
    return (
      <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
        {token ? renderUserFound() : renderNoUserFound()}
      </div>
    );
  }
  }
}

