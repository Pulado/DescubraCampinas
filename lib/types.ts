export interface Location {
  id: string
  name: string
  category: 'eventos' | 'feiras' | 'gastronomia' | 'cultura' | 'produtores'
  description: string
  images: string[]
  rating: number
  reviews: number
  distance: number
  address: string
  hours: string
  phone?: string
  website?: string
  coordinates: {
    lat: number
    lng: number
  }
  tags: string[]
  featured?: boolean
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  city?: string
  phone?: string
  bio?: string
  joinDate: string
  level: number
  xp: number
  coins: number
  visits: number
  distance: number
  badges: Badge[]
  visitedLocations: string[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export interface Reward {
  id: string
  title: string
  description: string
  coins: number
  type: 'coupon' | 'cashback' | 'discount'
  icon: string
  claimed: boolean
  expiry?: string
}

export interface RankingUser {
  id: string
  firstName: string
  lastName: string
  avatar: string
  points: number
  level: number
  position: number
  badges: number
}

export interface ImpactMetrics {
  producersSupported: number
  eventsVisited: number
  localEconomy: number
  co2Saved: number
  treesPlanted: number
  communityHours: number
}
