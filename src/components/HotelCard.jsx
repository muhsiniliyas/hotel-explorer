import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({ hotel }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">☆</span>)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>)
    }

    return stars
  }

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': '📶',
      'Pool': '🏊‍♂️',
      'Gym': '💪',
      'Spa': '🧘‍♀️',
      'Restaurant': '🍽️',
      'Room Service': '🛎️',
      'Parking': '🚗',
      'Beach Access': '🏖️',
      'Bar': '🍹',
      'Fireplace': '🔥',
      'Hiking': '🥾',
      'Business Center': '💼',
      'Concierge': '🎩',
      'Golf': '⛳',
      'Tennis': '🎾',
      'Harbor View': '🌊',
      'Garden': '🌺',
      'Event Space': '🎪',
      'Coworking': '💻',
      'Tech Support': '🔧',
      'Lake View': '🏞️',
      'Boat Rental': '⛵',
      'Fishing': '🎣'
    }
    return icons[amenity] || '✨'
  }

  const displayedAmenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 4)

  return (
    <div className="hotel-card">
      <div className="hotel-image">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        <div className="hotel-price">
          <span>₹{hotel.price.toLocaleString()}</span>
          <small>/night</small>
        </div>
      </div>
      
      <div className="hotel-content">
        <div className="hotel-header">
          <h3 className="hotel-name">{hotel.name}</h3>
          <div className="hotel-rating">
            <div className="stars">
              {renderStars(hotel.rating)}
            </div>
            <span className="rating-text">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="hotel-location">
          <span className="location-icon">📍</span>
          {hotel.location}
        </div>
        
        <p className="hotel-description">{hotel.description}</p>
        
        <div className="hotel-amenities">
          <h4>Amenities</h4>
          <div className="amenities-list">
            {displayedAmenities.map((amenity, index) => (
              <span key={index} className="amenity-tag">
                <span className="amenity-icon">{getAmenityIcon(amenity)}</span>
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <button 
                className="show-more-amenities"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
              >
                {showAllAmenities ? 'Show Less' : `+${hotel.amenities.length - 4} more`}
              </button>
            )}
          </div>
        </div>
        
        <Link to={`/book/${hotel.id}`} className="book-now-link">
          <button className="book-now-btn">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HotelCard
