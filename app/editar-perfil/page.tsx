'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { User, Mail, Phone, MapPin, Camera, ArrowLeft, Save } from 'lucide-react'
import { User as UserType } from '@/lib/types'

const presetAvatars = [
  'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
  'https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff',
  'https://ui-avatars.com/api/?name=User&background=ec4899&color=fff',
  'https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff',
  'https://ui-avatars.com/api/?name=User&background=10b981&color=fff',
  'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff',
]

export default function EditarPerfilPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    bio: '',
  })
  const [selectedAvatar, setSelectedAvatar] = useState(presetAvatars[0])
  const [customAvatar, setCustomAvatar] = useState('')
  const [useCustomAvatar, setUseCustomAvatar] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setFormData({
        firstName: parsedUser.firstName || '',
        lastName: parsedUser.lastName || '',
        city: parsedUser.city || '',
        phone: parsedUser.phone || '',
        bio: parsedUser.bio || '',
      })
      setSelectedAvatar(parsedUser.avatar || presetAvatars[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar)
    setUseCustomAvatar(false)
  }

  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomAvatar(reader.result as string)
        setUseCustomAvatar(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      phone: formData.phone,
      bio: formData.bio,
      avatar: useCustomAvatar ? customAvatar : selectedAvatar,
    }

    // Update current user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser))

    // Update in registered users if exists
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id)
    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUser
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
    }

    setTimeout(() => {
      setLoading(false)
      router.push('/perfil')
    }, 500)
  }

  const handleCancel = () => {
    router.push('/perfil')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Carregando...</p>
      </div>
    )
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim()

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={handleCancel}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl sm:text-3xl font-bold text-text">
                  Editar Perfil
                </h1>
              </div>

              {/* Edit Card */}
              <div className="glass rounded-2xl p-6 shadow-glass space-y-6">
                {/* Avatar Selection */}
                <div className="space-y-4">
                  <h3 className="font-medium text-text">Foto de perfil</h3>
                  
                  {/* Current Avatar Preview */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src={useCustomAvatar ? customAvatar : selectedAvatar} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-text font-medium">{fullName || 'Seu nome'}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Preset Avatars */}
                  <div className="flex flex-wrap gap-3">
                    {presetAvatars.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAvatarSelect(avatar)}
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                          selectedAvatar === avatar && !useCustomAvatar
                            ? 'border-primary scale-110'
                            : 'border-transparent hover:border-card'
                        }`}
                      >
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                      </button>
                    ))}
                    
                    {/* Custom Avatar Upload */}
                    <label className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-card hover:border-primary transition-all cursor-pointer flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomAvatarUpload}
                        className="hidden"
                      />
                      {customAvatar ? (
                        <img src={customAvatar} alt="Custom" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-6 h-6 text-text-secondary" />
                      )}
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Nome</label>
                      <Input
                        icon={<User className="w-5 h-5" />}
                        type="text"
                        name="firstName"
                        placeholder="Nome"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Sobrenome</label>
                      <Input
                        icon={<User className="w-5 h-5" />}
                        type="text"
                        name="lastName"
                        placeholder="Sobrenome"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Cidade</label>
                    <Input
                      icon={<MapPin className="w-5 h-5" />}
                      type="text"
                      name="city"
                      placeholder="Cidade"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Telefone</label>
                    <Input
                      icon={<Phone className="w-5 h-5" />}
                      type="tel"
                      name="phone"
                      placeholder="(19) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Biografia</label>
                    <textarea
                      name="bio"
                      placeholder="Conte um pouco sobre você..."
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-surface border border-card rounded-xl text-text placeholder-text-secondary focus:outline-none focus:border-primary resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={handleCancel} disabled={loading}>
                      Cancelar
                    </Button>
                    <Button variant="primary" className="flex-1" type="submit" disabled={loading}>
                      {loading ? 'Salvando...' : 'Salvar alterações'}
                      <Save className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  )
}
