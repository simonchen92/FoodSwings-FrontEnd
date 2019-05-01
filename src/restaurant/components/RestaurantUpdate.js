// UPDATE RESTAURANT NO LONGER IN USE
// WANT USER TO ONLY ADD AND DELETE RESTAURANTS FROM THEIR LIST

// import React, { Component } from 'react'
// import { showOneRestaurant, updateRestaurant } from '../api'
// import { withRouter } from 'react-router-dom'
// import { Redirect } from 'react-router'
// import RestaurantForm from './RestaurantForm'
// import messages from '../messages'

// class RestaurantUpdate extends Component {
//   constructor () {
//     super()

//     this.state = {
//       restaurant: {
//         name: '',
//         location: '',
//         telephone: '',
//         specialty: ''
//       },
//       updated: false,
//       message: null
//     }
//   }

//   componentDidMount () {
//     const id = this.props.match.params.id
//     showOneRestaurant(this.props.user, id)
//       .then(response => this.setState({ restaurant: response.data.restaurant }))
//       .catch(error => {
//         console.error(error)
//         alert(messages.failure, 'danger')
//       })
//   }

// handleSubmit = (event) => {
//   event.preventDefault()

//   const { alert } = this.props
//   const restaurant = this.state

//   updateRestaurant(this.props.user, restaurant)
//     .then(response => this.setState({
//       updated: true,
//       restaurant: response.data.restaurant
//     }))
//     .then(() => alert(messages.updateRestaurantSuccess, 'success'))
//     .catch(() => {
//       this.setState({ restaurant: { ...restaurant, name: '', location: '', telephone: '', specialty: '' } })
//       alert(messages.updateRestaurantFailure, 'danger')
//     })
// }

// handleChange = event => {
//   const inputName = event.target.name
//   const updatedInputValue = event.target.value
//   const updatedRestaurant = { ...this.state.restaurant, [inputName]: updatedInputValue }
//   this.setState({ restaurant: updatedRestaurant })
// }

// render () {
//   const { restaurant, updated, message } = this.state

//   if (updated) {
//     return <Redirect to={`/restaurants/${restaurant.id}`} />
//   }
//   const { name, location, telephone, specialty } = this.state.restaurant

//   return (
//     <RestaurantForm
//       name={name}
//       address={location}
//       telephone={telephone}
//       specialty={specialty}
//       message={message}
//       handleChange={this.handleChange}
//       handleSubmit={this.handleSubmit}
//     />
//   )
// }
// }

// export default withRouter(RestaurantUpdate)
