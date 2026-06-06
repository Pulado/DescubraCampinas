'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { MapPin, Star, Navigation, Heart } from 'lucide-react'
import { Location } from '@/lib/types'

interface LocationCardProps {
  location: Location
  onVisit?: (id: string) => void
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onVisit }) => {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(location.id))
  }, [location.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== location.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, location.id]))
      setIsFavorite(true)
    }
  }

  return (
    <Link href={`/local/${location.id}`}>
      <Card className="overflow-hidden cursor-pointer hover:shadow-glow transition-shadow">
        <div className="relative h-48 mb-4">
          <img
            src={location.images[0]}
            alt={location.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
            }}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 glass backdrop-blur rounded-full ${isFavorite ? 'text-red-500' : 'text-text'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{location.category}</Badge>
          </div>
          {location.featured && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="accent">Destaque</Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-text mb-1">{location.name}</h3>
            <p className="text-sm text-text-secondary line-clamp-2">{location.description}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="font-medium text-text">{location.rating}</span>
              <span>({location.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location.distance} km</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {location.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button variant="primary" size="sm" className="w-full">
            <Navigation className="w-4 h-4" />
            Ver Detalhes
          </Button>
        </div>
      </Card>
    </Link>
  )
}
