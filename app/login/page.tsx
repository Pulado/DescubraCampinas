'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, Globe, ArrowRight, User } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = () => {
    setLoading(true)
    // Simulated Google login with complete user data
    const user = {
      id: 'user-' + Date.now(),
      firstName: 'Usuário',
      lastName: 'Google',
      email: email || 'google.user@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=random',
      city: 'Campinas',
      phone: '',
      bio: '',
      joinDate: new Date().toISOString().split('T')[0],
      provider: 'google',
      level: 1,
      xp: 0,
      coins: 100,
      visits: 0,
      distance: 0,
      badges: [],
      visitedLocations: [],
    }
    localStorage.setItem('user', JSON.stringify(user))
    setTimeout(() => {
      setLoading(false)
      router.push('/')
    }, 1000)
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    
    setLoading(true)
    
    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const existingUser = existingUsers.find((u: any) => u.email === email)
    
    if (existingUser) {
      // Login with existing user data
      const user = {
        ...existingUser,
        level: 1,
        xp: 0,
        coins: 100,
        visits: 0,
        distance: 0,
        badges: [],
        visitedLocations: [],
      }
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      // Create new user from email login
      const nameParts = email.split('@')[0].split(/[._-]/)
      const user = {
        id: 'user-' + Date.now(),
        firstName: nameParts[0] || 'Usuário',
        lastName: nameParts[1] || '',
        email: email,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(email.split('@')[0]) + '&background=random',
        city: 'Campinas',
        phone: '',
        bio: '',
        joinDate: new Date().toISOString().split('T')[0],
        provider: 'email',
        level: 1,
        xp: 0,
        coins: 100,
        visits: 0,
        distance: 0,
        badges: [],
        visitedLocations: [],
      }
      localStorage.setItem('user', JSON.stringify(user))
    }
    
    setTimeout(() => {
      setLoading(false)
      router.push('/')
    }, 1000)
  }

  const handleGuestLogin = () => {
    setLoading(true)
    // Guest login with complete user data
    const user = {
      id: 'guest-' + Date.now(),
      firstName: 'Visitante',
      lastName: '',
      email: 'visitante@descubra.campinas',
      avatar: 'https://ui-avatars.com/api/?name=Visitante&background=random',
      city: 'Campinas',
      phone: '',
      bio: '',
      joinDate: new Date().toISOString().split('T')[0],
      provider: 'guest',
      level: 1,
      xp: 0,
      coins: 50,
      visits: 0,
      distance: 0,
      badges: [],
      visitedLocations: [],
    }
    localStorage.setItem('user', JSON.stringify(user))
    setTimeout(() => {
      setLoading(false)
      router.push('/')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="mt-4 text-text-secondary">
            Descubra o melhor de Campinas
          </p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-2xl p-6 shadow-glass space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text mb-2">Bem-vindo de volta</h1>
            <p className="text-text-secondary text-sm">
              Entre para descobrir locais incríveis
            </p>
          </div>

          {/* Google Login */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Globe className="w-5 h-5" />
            {loading ? 'Entrando...' : 'Continuar com Google'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary">ou</span>
            </div>
          </div>

          {/* Email Login */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              icon={<Mail className="w-5 h-5" />}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Input
              icon={<Lock className="w-5 h-5" />}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            
            <div className="text-right">
              <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Guest Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            <User className="w-5 h-5 mr-2" />
            {loading ? 'Entrando...' : 'Explorar como visitante'}
          </Button>
        </motion.div>

        {/* Sign Up */}
        <p className="mt-6 text-center text-text-secondary text-sm">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="text-primary hover:underline font-medium">
            Criar conta
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
