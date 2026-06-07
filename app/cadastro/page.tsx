'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, User, ArrowRight, Check, Camera, Upload } from 'lucide-react'
import { useLocationDetection } from '@/lib/hooks/useLocationDetection'

const presetAvatars = [
  'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
  'https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff',
  'https://ui-avatars.com/api/?name=User&background=ec4899&color=fff',
  'https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff',
  'https://ui-avatars.com/api/?name=User&background=10b981&color=fff',
  'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff',
]

export default function CadastroPage() {
  const router = useRouter()
  const { city, loading: locationLoading } = useLocationDetection()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phone: '',
    bio: '',
  })
  const [selectedAvatar, setSelectedAvatar] = useState(presetAvatars[0])
  const [customAvatar, setCustomAvatar] = useState('')
  const [useCustomAvatar, setUseCustomAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.firstName) newErrors.firstName = 'Nome é obrigatório'
    if (!formData.lastName) newErrors.lastName = 'Sobrenome é obrigatório'
    if (!formData.email) newErrors.email = 'Email é obrigatório'
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido'
    if (!formData.password) newErrors.password = 'Senha é obrigatória'
    if (formData.password.length < 6) newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não conferem'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    // Simulated registration with complete user data
    const user = {
      id: 'user-' + Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      avatar: useCustomAvatar ? customAvatar : selectedAvatar,
      city: formData.city || 'Campinas',
      phone: formData.phone,
      bio: formData.bio,
      joinDate: new Date().toISOString().split('T')[0],
      level: 1,
      xp: 0,
      coins: 150,
      visits: 0,
      distance: 0,
      badges: [],
      visitedLocations: [],
    }
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(user))
    
    // Also save to registered users for future logins
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    registeredUsers.push(user)
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
    
    setTimeout(() => {
      setLoading(false)
      router.push('/')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
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

  const fullName = formData.firstName && formData.lastName 
    ? `${formData.firstName} ${formData.lastName}`
    : 'User'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[500px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size="lg" city={city} loading={locationLoading} />
          <p className="mt-4 text-text-secondary">
            Crie sua conta e comece a explorar {city || 'Campinas'}
          </p>
        </div>

        {/* Registration Card */}
        <div className="glass rounded-2xl p-6 shadow-glass space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text mb-2">Criar conta</h1>
            <p className="text-text-secondary text-sm">
              Preencha seus dados para se cadastrar
            </p>
          </div>

          {/* Avatar Selection */}
          <div className="space-y-4">
            <h3 className="font-medium text-text">Escolha seu avatar</h3>
            
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  icon={<User className="w-5 h-5" />}
                  type="text"
                  name="firstName"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Input
                  icon={<User className="w-5 h-5" />}
                  type="text"
                  name="lastName"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                icon={<Mail className="w-5 h-5" />}
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  icon={<Lock className="w-5 h-5" />}
                  type="password"
                  name="password"
                  placeholder="Senha (mínimo 6 caracteres)"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <Input
                  icon={<Lock className="w-5 h-5" />}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                icon={<User className="w-5 h-5" />}
                type="text"
                name="city"
                placeholder="Cidade (opcional)"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                icon={<User className="w-5 h-5" />}
                type="tel"
                name="phone"
                placeholder="Telefone (opcional)"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <textarea
                name="bio"
                placeholder="Biografia (opcional)"
                value={formData.bio}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 bg-surface border border-card rounded-xl text-text placeholder-text-secondary focus:outline-none focus:border-primary resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-text-secondary">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>Ao se cadastrar, você concorda com nossos termos de uso</span>
            </div>

            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-text-secondary text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Fazer login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
