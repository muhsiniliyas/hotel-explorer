import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const BookingPage = ({ hotels, onAddBooking, isDarkTheme, onToggleTheme }) => {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const hotel = hotels.find(h => h.id === parseInt(hotelId))
  
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard',
    specialRequests: ''
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

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.guestName.trim()) newErrors.guestName = 'Guest name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required'
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required'
    
    if (formData.checkIn && formData.checkOut) {
      if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        newErrors.checkOut = 'Check-out date must be after check-in date'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const diffTime = Math.abs(checkOut - checkIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const roomMultiplier = formData.roomType === 'deluxe' ? 1.5 : formData.roomType === 'suite' ? 2 : 1
    return Math.round(nights * hotel.price * roomMultiplier)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const booking = {
      hotelId: parseInt(hotelId),
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      ...formData,
      nights: calculateNights(),
      totalAmount: calculateTotal()
    }
    
    onAddBooking(booking)
    alert(`Booking confirmed for ${hotel.name}!\nTotal: ₹${calculateTotal().toLocaleString()}`)
    navigate('/')
  }

  if (!hotel) {
    return (
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <div className="booking-error">
          <h2>Hotel not found</h2>
          <Link to="/">← Back to Hotels</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>🏨 Book Your Stay</h1>
            <p>Complete your reservation</p>
          </div>
          <ThemeToggle isDark={isDarkTheme} onToggle={onToggleTheme} />
        </div>
      </header>

      <div className="booking-container">
        <div className="booking-nav">
          <Link to="/" className="back-link">← Back to Hotels</Link>
        </div>

        <div className="booking-content">
          <div className="hotel-summary">
            <img src={hotel.image} alt={hotel.name} className="hotel-summary-image" />
            <div className="hotel-summary-info">
              <h2>{hotel.name}</h2>
              <p className="location">📍 {hotel.location}</p>
              <p className="rating">⭐ {hotel.rating}/5</p>
              <p className="price">₹{hotel.price.toLocaleString()}/night</p>
              <p className="description">{hotel.description}</p>
              
              <div className="hotel-amenities-summary">
                <h4>Available Amenities:</h4>
                <div className="amenities-list">
                  {hotel.amenities.slice(0, 6).map(amenity => (
                    <span key={amenity} className="amenity-tag-small">{amenity}</span>
                  ))}
                  {hotel.amenities.length > 6 && (
                    <span className="amenity-tag-small">+{hotel.amenities.length - 6} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <h3>Booking Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guestName">Guest Name *</label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  className={errors.guestName ? 'error' : ''}
                />
                {errors.guestName && <span className="error-text">{errors.guestName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkIn">Check-in Date *</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.checkIn ? 'error' : ''}
                />
                {errors.checkIn && <span className="error-text">{errors.checkIn}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="checkOut">Check-out Date *</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className={errors.checkOut ? 'error' : ''}
                />
                {errors.checkOut && <span className="error-text">{errors.checkOut}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="roomType">Room Type</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                <option value="standard">Standard Room (₹{hotel.price.toLocaleString()}/night)</option>
                <option value="deluxe">Deluxe Room (₹{Math.round(hotel.price * 1.5).toLocaleString()}/night)</option>
                <option value="suite">Suite (₹{(hotel.price * 2).toLocaleString()}/night)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="3"
                placeholder="Any special requirements or requests..."
              ></textarea>
            </div>

            {formData.checkIn && formData.checkOut && calculateNights() > 0 && (
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-row">
                  <span>Nights:</span>
                  <span>{calculateNights()}</span>
                </div>
                <div className="summary-row">
                  <span>Room Type:</span>
                  <span>{formData.roomType.charAt(0).toUpperCase() + formData.roomType.slice(1)}</span>
                </div>
                <div className="summary-row total">
                  <span><strong>Total Amount:</strong></span>
                  <span><strong>₹{calculateTotal().toLocaleString()}</strong></span>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
