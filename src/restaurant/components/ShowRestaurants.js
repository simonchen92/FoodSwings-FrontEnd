import React, { Component } from 'react'
import { showRestaurants, deleteRestaurant } from '../api'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import messages from '../messages'

class ShowRestaurants extends Component {
  constructor () {
    super()

    this.state = {
      restaurants: [],
      messages: null
    }
  }

  componentDidMount () {
    showRestaurants(this.props.user)
      .then(response => this.setState({ restaurants: response.data.restaurants }))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', location: '', telephone: '', specialty: '' })
      })
  }

  handleDelete = (id) => {
    const user = this.props.user
    const { alert } = this.props

    deleteRestaurant(user, id)
      .then(() => this.componentDidMount())
      .then(() => alert(messages.deleteRestaurantSuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.deleteRestaurantFailure, 'danger')
      })
  }

  render () {
    const { restaurants } = this.state

    if (!this.state.restaurants) {
      return <p>Loading...</p>
    }

    return (
      <div className="restaurants-container d-flex flex-column flex-wrap justify-content-center">
        <div className="my-restaurants d-flex justify-content-center align-items-center">My Restaurants</div>
        <div className="restaurants-container d-flex flex-wrap justify-content-center">
          {restaurants.map((restaurant, index) => (
            <Card key={restaurant.id}>
              <Card.Img className="yelp-image" variant="top" src={restaurant.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="restaurant-spacer">{restaurant.name}</Card.Title>
                <Card.Text className="m-1 restaurant-spacer">{restaurant.location}</Card.Text>
                <Card.Text className="m-1"><strong>{restaurant.specialty}</strong></Card.Text>
                <Card.Text className="m-1"><strong>Phone Number:</strong> +{restaurant.telephone}</Card.Text>
                <div className="d-flex justify-content-center mt-2">
                  <button className="btn-danger delete-restaurant-btn" onClick={() => this.handleDelete(restaurant.id)} value={index} name="delete-restaurant">Delete Restaurant</button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(ShowRestaurants)
