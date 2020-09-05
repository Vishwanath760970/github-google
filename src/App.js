import React, { Component } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';

import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  //search github users, by getting this text parameter value from search.js input field, by passing up this prop
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      users: res.data.items,
      loading: false,
    });
    console.log(res.data.items);
  };

  //clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />

          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
