'use client'

import { useState, useEffect } from 'react'

interface LocationDetectionState {
  city: string
  loading: boolean
  error: boolean
}

const STORAGE_KEY = 'userDetectedCity'
const FALLBACK_CITY = 'Campinas'

export const useLocationDetection = () => {
  const [state, setState] = useState<LocationDetectionState>({
    city: '',
    loading: true,
    error: false,
  })

  useEffect(() => {
    // Check if city is already stored in localStorage
    const storedCity = localStorage.getItem(STORAGE_KEY)
    if (storedCity) {
      setState({
        city: storedCity,
        loading: false,
        error: false,
      })
      return
    }

    detectLocation()
  }, [])

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      // Geolocation not supported, use fallback
      setState({
        city: FALLBACK_CITY,
        loading: false,
        error: true,
      })
      localStorage.setItem(STORAGE_KEY, FALLBACK_CITY)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await reverseGeocode(latitude, longitude)
      },
      (error) => {
        // Permission denied or error, use fallback
        console.warn('Geolocation error:', error)
        setState({
          city: FALLBACK_CITY,
          loading: false,
          error: true,
        })
        localStorage.setItem(STORAGE_KEY, FALLBACK_CITY)
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 86400000, // 24 hours
      }
    )
  }

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'pt-BR',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to reverse geocode')
      }

      const data = await response.json()
      
      // Extract city name from address
      let city = data.address?.city || 
                 data.address?.town || 
                 data.address?.village || 
                 data.address?.municipality ||
                 data.address?.county ||
                 FALLBACK_CITY

      // Clean up city name (remove state/region if present)
      city = city.split('-')[0].trim()

      setState({
        city,
        loading: false,
        error: false,
      })
      localStorage.setItem(STORAGE_KEY, city)
    } catch (error) {
      console.warn('Reverse geocoding error:', error)
      setState({
        city: FALLBACK_CITY,
        loading: false,
        error: true,
      })
      localStorage.setItem(STORAGE_KEY, FALLBACK_CITY)
    }
  }

  return state
}
