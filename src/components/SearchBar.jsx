import React, { useState, useEffect, useRef, useCallback } from 'react'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [inputValue, setInputValue] = useState(searchTerm || '')
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)
  
  // Only sync when external searchTerm changes (not internal)
  useEffect(() => {
    if (searchTerm !== inputValue) {
      setInputValue(searchTerm || '')
    }
  }, [searchTerm]) // Removed inputValue to prevent re-sync loops

  // Stable debounced function
  const debouncedSearch = useCallback((value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearchChange(value)
    }, 300)
  }, [onSearchChange])

  // Handle input change with immediate local update
  const handleInputChange = useCallback((e) => {
    const value = e.target.value
    setInputValue(value) // Immediate local update - no blinking
    debouncedSearch(value) // Debounced parent update
  }, [debouncedSearch])

  const handleClear = useCallback(() => {
    setInputValue('')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onSearchChange('')
    inputRef.current?.focus()
  }, [onSearchChange])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue} // Uses local state - prevents blinking
          onChange={handleInputChange}
          placeholder="Search hotels, locations, or descriptions..."
          className="search-input"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <span className="search-icon">🔍</span>
        {inputValue && (
          <button
            className="clear-search"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
