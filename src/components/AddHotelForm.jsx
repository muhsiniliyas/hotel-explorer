import React, { useState } from 'react'

const AddHotelForm = ({ onAddHotel, existingHotels, availableAmenities }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '',
    image: '',
    description: '',
    amenities: []
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleAmenityToggle = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.filter(a => a !== amenity)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Hotel name is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }
    if (formData.amenities.length === 0) {
      newErrors.amenities = 'Please select at least one amenity'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const newHotel = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      price: parseInt(formData.price),
      rating: parseFloat(formData.rating),
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      description: formData.description.trim() || `Experience luxury at ${formData.name} in ${formData.location}.`,
      amenities: formData.amenities
    }

    onAddHotel(newHotel)
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '',
      image: '',
      description: '',
      amenities: []
    })
    setErrors({})
  }

  return (
    <div className="add-hotel-form">
      <h3>🏨 Add New Hotel</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Hotel Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter hotel name..."
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
              placeholder="Enter location..."
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price per Night (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              className={errors.price ? 'error' : ''}
              placeholder="Enter price..."
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating (0-5) *</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className={errors.rating ? 'error' : ''}
              placeholder="Enter rating..."
            />
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the hotel..."
          />
        </div>

        <div className="form-group">
          <label>Amenities * ({formData.amenities.length} selected)</label>
          <div className="amenities-selection">
            {availableAmenities.map(amenity => (
              <label key={amenity} className="amenity-checkbox">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                <span className="checkmark"></span>
                {amenity}
              </label>
            ))}
          </div>
          {errors.amenities && <span className="error-message">{errors.amenities}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddHotelForm
