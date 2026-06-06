'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/Input'

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  
  return (
    <div className="relative">
      <Input
        icon={<Search className="w-5 h-5" />}
        placeholder="Buscar locais, eventos, produtores..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-surface"
      />
    </div>
  )
}
