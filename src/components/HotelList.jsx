import React from 'react'
import HotelCard from './HotelCard'

const HotelList = ({ hotels }) => {
  if (hotels.length === 0) {
    return (
      <div className="no-hotels">
        <div className="no-hotels-content">
          <h3>🏨 No hotels found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hotel-list">
      <div className="hotel-grid">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default HotelList
