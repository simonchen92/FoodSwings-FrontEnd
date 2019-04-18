import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { searchYelp } from '../api'
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
    console.log('Did onSearchRestaurant Run??')

    const { alert, user } = this.props
    searchYelp(this.state.search, user)
      .then(a => { console.log(a); return a })
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
          {this.state.restaurants.map(restaurant => (
            <Card key={ restaurant.alias }>
              <Card.Img className="yelp-image" variant="top" src={restaurant.image_url} />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  {restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}<br/>
                  <strong>{restaurant.categories[0].title}<br/></strong>
                  Phone Number: <strong>{restaurant.phone}</strong><br/>
                  Rating: <strong>{restaurant.rating}/5</strong><br/>
                  Price: <span className="restaurant-price">{restaurant.price}<br/></span>
                  Reviews: {restaurant.review_count}
                  <button className="btn-info add-restaurant-btn" type="submit">Add Restaurant</button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </form>
      </div>

    )
  }
}

export default withRouter(SearchRestaurants)
