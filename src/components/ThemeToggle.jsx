// ThemeToggle.jsx
import React from 'react'

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <span className="theme-icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
