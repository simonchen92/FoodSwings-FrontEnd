import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import { showOneRestaurant, deleteRestaurant } from '../api.js'
import messages from '../messages'

class ShowRestaurant extends Component {
  constructor () {
    super()

    this.state = {
      restaurant: {
        name: '',
        location: '',
        telephone: '',
        specialty: ''
      },
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id

    showOneRestaurant(this.props.user, id)
      .then(response => this.setState({ restaurant: response.data.restaurant }))
      .catch(error => {
        console.error(error)
        alert(messages.failure, 'danger')
      })
  }

  handleDelete = () => {
    const id = this.props.match.params.id
    const { alert } = this.props

    deleteRestaurant(this.props.user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => alert(messages.deleteRestaurantSuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.deleteRestaurantFailure, 'danger')
      })
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/restaurants'
      }} />
    }

    const { name, location, telephone, specialty } = this.state.restaurant

    return (
      <Fragment>
        <form className="show-restaurant-form">
          <div className="show-restaurant">
            <h4>{name}</h4>
            <p>Location: {location}</p>
            <p>Telephone: {telephone}</p>
            <p>Specialty: {specialty}</p>
            <button className="btn-danger" onClick={this.handleDelete}>Delete</button>
            <Link to={this.props.match.url + '/update'}><button className="btn-primary">Update</button></Link>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(ShowRestaurant)
