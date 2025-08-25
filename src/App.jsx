import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HotelList from './components/HotelList'
import SearchBar from './components/SearchBar'
import AddHotelForm from './components/AddHotelForm'
import FilterBar from './components/FilterBar'
import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'
import BookingPage from './components/BookingPage'

function App() {
  const [hotels, setHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [bookings, setBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [showAddForm, setShowAddForm] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Initial hotel data with amenities
  const initialHotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "Abu Dubai",
      price: 24999,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      description: "Luxury hotel in the heart of Manhattan with stunning city views.",
      amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant", "Room Service", "Parking"]
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Singapore",
      price: 16599,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      description: "Beachfront resort with private beach access and tropical gardens.",
      amenities: ["WiFi", "Pool", "Beach Access", "Restaurant", "Bar", "Spa"]
    },
    {
      id: 3,
      name: "Mountain Lodge",
      location: "Qatar",
      price: 13299,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      description: "Cozy mountain retreat with panoramic views and hiking trails.",
      amenities: ["WiFi", "Fireplace", "Hiking", "Restaurant", "Parking"]
    },
    {
      id: 4,
      name: "Urban Boutique Hotel",
      location: "Maladives",
      price: 20799,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      description: "Modern boutique hotel in downtown LA with rooftop pool.",
      amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Bar", "Business Center"]
    },
    {
      id: 5,
      name: "Historic Inn",
      location: "kochi",
      price: 14999,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      description: "Charming historic inn with period architecture and modern amenities.",
      amenities: ["WiFi", "Restaurant", "Concierge", "Room Service", "Parking"]
    },
    {
      id: 6,
      name: "Desert Oasis Resort",
      location: "Dubai",
      price: 15799,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      description: "Luxury desert resort with spa facilities and golf course.",
      amenities: ["WiFi", "Pool", "Spa", "Golf", "Restaurant", "Tennis"]
    },
    {
      id: 7,
      name: "Harbor View Hotel",
      location: "Paris",
      price: 19199,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      description: "Waterfront hotel with stunning harbor views and fresh seafood.",
      amenities: ["WiFi", "Restaurant", "Harbor View", "Business Center", "Parking"]
    },
    {
      id: 8,
      name: "Countryside Manor",
      location: "England",
      price: 12499,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      description: "Elegant manor house with rolling hills and southern hospitality.",
      amenities: ["WiFi", "Pool", "Garden", "Restaurant", "Event Space"]
    },
    {
      id: 9,
      name: "Tech Hub Hotel",
      location: "Istanbul",
      price: 23299,
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      description: "Modern hotel designed for tech professionals with coworking spaces.",
      amenities: ["WiFi", "Business Center", "Coworking", "Gym", "Restaurant", "Tech Support"]
    },
    {
      id: 10,
      name: "Lakeside Retreat",
      location: "Moscow",
      price: 17499,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      description: "Peaceful lakeside hotel with beautiful views of Lake Michigan.",
      amenities: ["WiFi", "Lake View", "Restaurant", "Boat Rental", "Fishing"]
    }
  ]

  useEffect(() => {
    setHotels(initialHotels)
    setFilteredHotels(initialHotels)
  }, [])

useEffect(() => {
  let filtered = hotels

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Filter by location only
  if (selectedLocation !== 'all') {
    filtered = filtered.filter(hotel => hotel.location === selectedLocation)
  }

  setFilteredHotels(filtered)
}, [hotels, searchTerm, selectedLocation])

  // Theme effect
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [isDarkTheme])

  // Scroll effect for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowBackToTop(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addHotel = (newHotel) => {
  const hotelWithId = {
    ...newHotel,
    id: Math.max(...hotels.map(h => h.id)) + 1
  }
  setHotels([...hotels, hotelWithId])
  setShowAddForm(false)
  setAddFormSearchTerm('')
  setAddFormFilterLocation('all')
}

  const addBooking = (newBooking) => {
    const bookingWithId = {
      ...newBooking,
      id: Math.max(0, ...bookings.map(b => b.id || 0)) + 1,
      bookingDate: new Date().toISOString()
    }
    setBookings([...bookings, bookingWithId])
  }

  const getUniqueLocations = () => {
    return ['all', ...new Set(hotels.map(hotel => hotel.location))]
  }

  const getAllAmenities = () => {
    const allAmenities = hotels.reduce((acc, hotel) => {
      return [...acc, ...hotel.amenities]
    }, [])
    return [...new Set(allAmenities)].sort()
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Main hotel list page component
  const HotelListPage = () => (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>🏨 Hotel Explorer</h1>
            <p>Discover amazing hotels around the world</p>
          </div>
          <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
        </div>
      </header>

      <div className="app-container">
        <div className="controls-section">
          <div className="search-filter-row">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            <FilterBar 
  locations={getUniqueLocations()}
  selectedLocation={selectedLocation}
  onLocationChange={setSelectedLocation}
/>
          </div>
          
          <button 
            className="add-hotel-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add New Hotel'}
          </button>
        </div>

        {showAddForm && (
          <AddHotelForm 
            onAddHotel={addHotel}
            existingHotels={filteredHotels}
            availableAmenities={getAllAmenities()}
          />
        )}

        <div className="results-info">
          <p>Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''}</p>
        </div>

        <HotelList hotels={filteredHotels} />
      </div>

      <BackToTop show={showBackToTop} onClick={scrollToTop} />
    </div>
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route 
          path="/book/:hotelId" 
          element={
            <BookingPage 
              hotels={hotels} 
              onAddBooking={addBooking}
              isDarkTheme={isDarkTheme}
              onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
            />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
