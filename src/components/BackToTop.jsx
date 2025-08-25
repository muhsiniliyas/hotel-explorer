import React, { useState, useEffect } from 'react'

const BackToTop = ({ show, onClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
      setScrollProgress(progress)
    }

    const handleScroll = () => {
      calculateScrollProgress()
    }

    window.addEventListener('scroll', handleScroll)
    calculateScrollProgress()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      className={`back-to-top ${show ? 'show' : ''}`}
      onClick={onClick}
      aria-label={`Back to top (${scrollProgress}% scrolled)`}
      title={`Back to top (${scrollProgress}% scrolled)`}
    >
      <div className="back-to-top-progress">
        <svg className="progress-ring" width="48" height="48">
          <circle
            className="progress-ring-circle-bg"
            cx="24"
            cy="24"
            r="20"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
          />
          <circle
            className="progress-ring-circle"
            cx="24"
            cy="24"
            r="20"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${2 * Math.PI * 20}`,
              strokeDashoffset: `${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
      </div>

      <div className="back-to-top-content">
        <div className="back-to-top-icon">
          <span className="arrow-up">↑</span>
        </div>
        <span className="back-to-top-text">Top</span>
        <span className="scroll-percentage">{scrollProgress}%</span>
      </div>
    </button>
  )
}

export default BackToTop
