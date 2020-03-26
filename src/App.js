import React from 'react';
import './App.css';


class App extends React.Component {
  state = {
    users: []
  }
  componentDidMount() {
    fetch("https://randomuser.me/api?results=25").then( (resp) => {
      return resp.json();
  }).then( (data) => {
    this.setState({users: data.results})
  });
  }

  getUserName (user) {
    return `${user.name.title} ${user.name.first} ${user.name.last}`
  }

  getUserDetails (user) {
    return `${user.email} ${user.location.street.number} ${user.location.street.name}`
  }

  toggleUserDetails(selectedUser) {
    let newUsers = this.state.users.map(user => {
      if (user.login.uuid === selectedUser.login.uuid) {
        user.isShowingDetails = !user.isShowingDetails
      } else {
        user.isShowingDetails = false
      }
      return user
    })

    this.setState({users: newUsers})
    //users is the key
    
  }



render() {
  // let isLoading = !this.state.users || this.state.users.length === 0
  // if (isLoading) {
  //   return ((<div>loading...</div>))
  return (
    <div>
      <h1>
        User List 
      </h1>
      <ul>
      {this.state.users.map((user, index) => {
        return (<li key={index}>
          <span>{this.getUserName(user)}</span>
          <img src={user.picture.thumbnail} alt='user thumbnail img'></img>
          <button onClick={this.toggleUserDetails.bind(this, user)}>{user.isShowingDetails ? "Hide Details" : "Show Details"}</button>
          {user.isShowingDetails &&
        <div>
          <span>
          {this.getUserDetails(user)}
          </span>
          </div>
      }
        </li>)
      })}
      </ul>
    </div>
  );
}
}

export default App;
