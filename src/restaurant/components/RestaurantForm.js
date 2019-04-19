import React from 'react'
import { withRouter } from 'react-router-dom'

const RestaurantForm = ({ name, address, telephone, specialty, handleSubmit, handleChange }) => {
  return (
    <div className="general-restaurant-form">
      <form className="restaurant-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="name">Restaurant Name</label>
          <input
            required
            className="form-control"
            name="name"
            placeholder="Restaurant Name"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="location">Location</label>
          <input
            required
            className="form-control"
            name="location"
            placeholder="Address"
            type="text"
            value={address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="telephone">Telephone</label>
          <input
            required
            className="form-control"
            name="telephone"
            placeholder="Telephone Number"
            type="number"
            value={telephone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="specialty">Specialty</label>
          <input
            required
            className="form-control"
            name="specialty"
            placeholder="Cuisine"
            type="text"
            value={specialty}
            onChange={handleChange}
          />
        </div>
        <button className="btn-danger create-button" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default withRouter(RestaurantForm)
