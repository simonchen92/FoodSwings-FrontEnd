import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { searchYelp, addRestaurant } from '../api'
import messages from '../messages'
import Card from 'react-bootstrap/Card'

class SearchRestaurants extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      restaurants: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onRestaurantSearch = event => {
    event.preventDefault()
    const { alert, user } = this.props
    searchYelp(this.state.search, user)
      .then(response => this.setState({ restaurants: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.restaurants || this.state.restaurants.length === 0) {
          alert(messages.onYelpSearchFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', location: '', telephone: '', specialty: '' })
        alert(messages.onYelpSearchFailure, 'danger')
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { alert, user } = this.props
    const restaurantObj = this.state.restaurants[Number(event.target.value)]

    const addedRestaurant = {
      name: restaurantObj.name,
      location: `${restaurantObj.location.address1} ${restaurantObj.location.city} ${restaurantObj.location.state} ${restaurantObj.location.zip_code}`,
      telephone: +restaurantObj.phone,
      specialty: restaurantObj.categories[0].title
    }

    addRestaurant(addedRestaurant, user)
      .then(() => alert(messages.addRestaurantSuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.addRestaurantFailure, 'danger')
      })
  }

  render () {
    if (!this.state.restaurants || this.state.restaurants.length < 1) {
      return (
        <div>
          <form className='search-restaurants-form' onSubmit={this.onRestaurantSearch}>
            <h3 className="yelp-header-main">Find New Restaurants!</h3>
            <input
              required
              className="search-restaurant-input"
              type="text"
              name="search"
              value={this.state.search}
              placeholder="Where?"
              onChange={this.handleChange}
            />
          </form>
        </div>
      )
    }

    return (
      <div className="restaurant-search">
        <form className='search-restaurants-form' onSubmit={this.onRestaurantSearch}>
          <h3 className="yelp-header-main">Find New Restaurants!</h3>
          <input
            required
            className="search-restaurant-input"
            type="text"
            name="search"
            value={this.state.search}
            placeholder="Where?"
            onChange={this.handleChange}
          />
        </form>
        {this.state.restaurants.map((restaurant, index) => (
          <Card key={ restaurant.alias } className="">
            <Card.Img className="yelp-image" variant="top" src={restaurant.image_url} />
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text className="card-text">
                {restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}<br/>
                <strong>{restaurant.categories[0].title}</strong><br/>
                  Phone Number: <strong>{restaurant.phone}</strong><br/>
                  Rating: <strong>{restaurant.rating}/5</strong><br/>
                  Price: <span className="restaurant-price"><strong>{restaurant.price}</strong></span><br/>
                  Reviews: {restaurant.review_count}
              </Card.Text>
              <div className="d-flex justify-content-center my-3">
                <button className="btn-info add-restaurant-btn" onClick={this.handleSubmit} value={index} name="restaurant">Add Restaurant</button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

    )
  }
}

export default withRouter(SearchRestaurants)
