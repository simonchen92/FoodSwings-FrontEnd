import React, { Component, Fragment } from 'react'
import { showRestaurants } from '../api'
import { Link, withRouter } from 'react-router-dom'

class ShowRestaurants extends Component {
  constructor () {
    super()

    this.state = {
      restaurants: []
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

  render () {
    const { restaurants } = this.state

    if (!this.state.restaurants) {
      return <p>Loading...</p>
    }

    return (
      <div className='restaurants'>
        <Fragment>
          <h1 className='restaurant-name'>My Restaurants</h1>
          {restaurants.map(restaurant => (
            <div className='restaurant-id' key={restaurant.id}>
              <Link to={'/restaurants/' + restaurant.id}>{restaurant.name}</Link>
            </div>
          ))}
        </Fragment>
      </div>
    )
  }
}

export default withRouter(ShowRestaurants)
