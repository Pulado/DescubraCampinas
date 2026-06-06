'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    
    // Simulated password recovery
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
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
            Recupere sua senha
          </p>
        </div>

        {!sent ? (
          <>
            {/* Recovery Card */}
            <div className="glass rounded-2xl p-6 shadow-glass space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-text mb-2">Esqueceu a senha?</h1>
                <p className="text-text-secondary text-sm">
                  Digite seu email e enviaremos instruções para recuperar sua senha
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  icon={<Mail className="w-5 h-5" />}
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

                <Button variant="primary" className="w-full" type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar instruções'}
                  <Mail className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

            {/* Back to Login */}
            <Link href="/login" className="mt-6 flex items-center justify-center gap-2 text-text-secondary hover:text-text text-sm">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </>
        ) : (
          <>
            {/* Success Card */}
            <div className="glass rounded-2xl p-6 shadow-glass space-y-6 text-center">
              <CheckCircle className="w-16 h-16 text-green mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text mb-2">Email enviado!</h1>
              <p className="text-text-secondary text-sm">
                Enviamos instruções para recuperar sua senha para <strong>{email}</strong>
              </p>
              <p className="text-text-secondary text-xs">
                Verifique sua caixa de entrada e spam
              </p>

              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => router.push('/login')}
              >
                Voltar para o login
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
