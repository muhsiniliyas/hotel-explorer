import React from 'react'

const FilterBar = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="filter-bar location-only">
      <div className="filter-group">
        <label htmlFor="location-filter" className="filter-label">
          📍 Location:
        </label>
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="location-select"
        >
          {locations.map(location => (
            <option key={location} value={location}>
              {location === 'all' ? 'All Locations' : location}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterBar
