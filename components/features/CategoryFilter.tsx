'use client'

import React from 'react'
import { categories } from '@/lib/data'
import { Badge } from '../ui/Badge'

export const CategoryFilter: React.FC<{
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-surface text-text-secondary hover:bg-card'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-surface text-text-secondary hover:bg-card'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
