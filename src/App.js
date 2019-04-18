import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './restaurant/Home'

import ShowRestaurants from './restaurant/components/ShowRestaurants'
import ShowRestaurant from './restaurant/components/ShowRestaurant'
import CreateRestaurant from './restaurant/components/CreateRestaurant'
import RestaurantUpdate from './restaurant/components/RestaurantUpdate'
import SearchRestaurants from './restaurant/components/SearchRestaurants'

import { AlertList } from 'react-bs-notifier'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      timeout: 3000,
      position: 'bottom-left'
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type, headline = '', timeout = 2000) => {
    const newAlert = {
      id: (new Date()).getTime(),
      type: type,
      headline: headline,
      message: message
    }

    this.setState(prevState => ({
      alerts: [...prevState.alerts, newAlert]
    }), () => {
      setTimeout(() => {
        const index = this.state.alerts.indexOf(newAlert)
        if (index >= 0) {
          this.setState(prevState => ({
            // remove the alert from the array
            alerts: [...prevState.alerts.slice(0, index), ...prevState.alerts.slice(index + 1)]
          }))
        }
      }, timeout)
    })
  }

  render () {
    const { alerts, user, timeout, position } = this.state

    return (
      <React.Fragment>
        <Header user={user} />

        <AlertList
          position={position}
          alerts={alerts}
          timeout={timeout}
        />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path="/" render={() => (
            <Home />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/restaurants' render={() => (
            <ShowRestaurants alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/restaurants/:id' render={() => (
            <ShowRestaurant alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-restaurant' render={() => (
            <CreateRestaurant alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/restaurants/:id/update' render={({ match }) => (
            <RestaurantUpdate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/search-restaurants' render={({ match }) => (
            <SearchRestaurants alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
