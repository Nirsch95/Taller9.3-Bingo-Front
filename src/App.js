import React, { Component } from 'react';
import './App.css';
import { UserService } from './service/UserService';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
//import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';


import 'primereact/resources/themes/lara-dark-purple/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
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

  register(){
    this.userService.register(this.state.user).then(data => {
      this.setState({
        user: {
          id: null,
          email: null,
          password: null
        }
      });
    })
  }

  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto', marginTop: '20px' }}>
        <Panel header="Crear Usuario">
          <form id="user-form">
            <span className="p-float-label">
              <InputText style={{ width: '100%' }} value={this.state.value} id="email" onChange={(e) => {
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
              <Password style={{ width: '100%'}} value={this.state.value} id="password" onChange={(e) => {
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
              <Button style={{ width: '60%', margin: '0 0 0 80px'}} label="Guardar" icon="pi pi-check" onClick={this.register}/>
            </span>
          </form>
        </Panel>
      </div>
    );
  }

}
