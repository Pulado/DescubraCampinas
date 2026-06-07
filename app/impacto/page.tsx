'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/Badge'
import { impactMetrics } from '@/lib/data'
import { 
  Leaf, 
  Calendar, 
  DollarSign, 
  TreePine, 
  Users,
  Globe,
  Target,
  TrendingUp
} from 'lucide-react'

export default function ImpactoPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const metrics = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      label: 'Produtores Apoiados',
      value: impactMetrics.producersSupported,
      color: 'bg-primary/20',
      ods: '11.A'
    },
    {
      icon: <Calendar className="w-8 h-8 text-secondary" />,
      label: 'Eventos Visitados',
      value: impactMetrics.eventsVisited,
      color: 'bg-secondary/20',
      ods: '11.4'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-accent" />,
      label: 'Economia Local (R$)',
      value: impactMetrics.localEconomy.toLocaleString('pt-BR'),
      color: 'bg-accent/20',
      ods: '11.3'
    },
    {
      icon: <TreePine className="w-8 h-8 text-green-500" />,
      label: 'Árvores Plantadas',
      value: impactMetrics.treesPlanted,
      color: 'bg-green-500/20',
      ods: '11.7'
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      label: 'CO2 Economizado (kg)',
      value: impactMetrics.co2Saved.toLocaleString('pt-BR'),
      color: 'bg-green-400/20',
      ods: '11.6'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      label: 'Horas Comunitários',
      value: impactMetrics.communityHours,
      color: 'bg-blue-500/20',
      ods: '11.3'
    },
  ]

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-1.5 flex items-center gap-3 font-heading">
              <Target className="w-8 h-8 text-primary" />
              Impacto
            </h1>
            <p className="text-text-secondary mb-6 text-sm">
              Seu impacto no ODS 11 - Cidades e Comunidades Sustentáveis
            </p>

            {/* ODS 11 Banner */}
            <div className="gradient-green rounded-2xl p-6 mb-8 shadow-glow">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎯</div>
                <div>
                  <h2 className="text-2xl font-bold text-text font-heading">ODS 11</h2>
                  <p className="text-text/90 text-sm">
                    Cidades e Comunidades Sustentáveis
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {metric.icon}
                    <Badge variant="default" className="text-xs px-2 py-1 rounded-md">{metric.ods}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-text mb-1 font-heading">{metric.value}</div>
                  <div className="text-sm text-text-secondary">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Impact Summary */}
            <div className="card-premium rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-3 font-heading">
                <TrendingUp className="w-5 h-5 text-yellow" />
                Resumo do Impacto
              </h3>
              <div className="space-y-3 text-text-secondary text-sm">
                <p>
                  Ao apoiar {impactMetrics.producersSupported} produtores locais, você está 
                  contribuindo para uma economia mais sustentável e fortalecendo a comunidade local.
                </p>
                <p>
                  Suas {impactMetrics.eventsVisited} visitas a eventos culturais ajudam a 
                  preservar e promover a diversidade cultural de Campinas.
                </p>
                <p>
                  Com R$ {impactMetrics.localEconomy.toLocaleString('pt-BR')} movimentados na 
                  economia local, você está gerando emprego e renda para a comunidade.
                </p>
                <p>
                  Ao escolher produtores locais, você economizou {impactMetrics.co2Saved.toLocaleString('pt-BR')} kg 
                  de CO2, contribuindo para um ambiente mais limpo.
                </p>
              </div>
            </div>

            {/* ODS 11 Targets */}
            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text mb-4 font-heading">Metas do ODS 11</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-xl">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">11.3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">Inclusão social e econômica</div>
                    <div className="text-xs text-text-secondary">
                      Aumentar a urbanização inclusiva e sustentável
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-xl">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-secondary">11.4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">Patrimônio cultural</div>
                    <div className="text-xs text-text-secondary">
                      Fortalecer esforços para proteger o patrimônio cultural e natural
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-xl">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-accent">11.6</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">Impacto ambiental</div>
                    <div className="text-xs text-text-secondary">
                      Reduzir o impacto ambiental per capita das cidades
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-xl">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-green-500">11.7</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">Espaços verdes</div>
                    <div className="text-xs text-text-secondary">
                      Aumentar o acesso a espaços verdes e públicos
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-500">11.A</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">Planejamento integrado</div>
                    <div className="text-xs text-text-secondary">
                      Apoiar relações econômicas, sociais e ambientais positivas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
