import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createRestaurant } from '../api'
import { Redirect } from 'react-router'
import RestaurantForm from './RestaurantForm'
import messages from '../messages'

class CreateRestaurant extends Component {
  constructor () {
    super()

    this.state = {
      restaurant: {
        name: '',
        location: '',
        telephone: '',
        specialty: ''
      },
      created: false,
      message: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { alert } = this.props
    const restaurant = this.state

    createRestaurant(this.props.user, { restaurant: restaurant.restaurant })
      .then(response => this.setState({
        created: true,
        restaurant: response.data.restaurant
      }))
      .then(() => alert(messages.createRestaurantSuccess, 'success'))
      .catch(() => {
        this.setState({ restaurant: { ...restaurant, name: '', location: '', telephone: '', specialty: '' } })
        alert(messages.createRestaurantFailure, 'danger')
      })
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value
    const updatedRestaurant = { ...this.state.restaurant, [inputName]: updatedInputValue }
    this.setState({ restaurant: updatedRestaurant })
  }

  render () {
    const { restaurant, created, message } = this.state

    if (created) {
      return <Redirect to={`/restaurants/${restaurant.id}`} />
    }

    const { name, location, telephone, specialty } = this.state.restaurant

    return (
      <RestaurantForm
        name={name}
        address={location}
        telephone={telephone}
        specialty={specialty}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateRestaurant)
