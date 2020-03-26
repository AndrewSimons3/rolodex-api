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

  isFlagged (user) {
    let newDetails = this.state.users.map((aUser) => {
      if(aUser.id === user.id) {
        aUser.isFlagged = !aUser.isFlagged
      }
    return `${user.location} ${user.email} ${user.login} ${user.dob}` 
  })

  this.setState({users: newDetails})
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
          <button onClick={this.isFlagged.bind(this, user)}>{user.isFlagged ? "Hide Details" : "Show Details"}</button>
        </li>)
      })}
      </ul>
    </div>
  );
}}

export default App;
