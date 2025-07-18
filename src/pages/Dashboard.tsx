import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Leaf,
  Target,
  Calendar,
  MapPin,
  Activity,
} from 'lucide-react'
import { MonthlyConsumptionChart } from '@/components/charts/MonthlyConsumptionChart'
import { EmissionsByLocationChart } from '@/components/charts/EmissionsByLocationChart'

export default function Dashboard() {
  // Mock data for demonstration
  const totalEmissions = 2847.5
  const monthlyChange = -12.3
  const offsetCredits = 1250
  const locations = 47
  const peakAlerts = 3

  const recentPeaks = [
    {
      location: 'Madrid Office',
      month: 'Enero 2024',
      increase: '+34%',
      emissions: 145.2,
      type: 'electricity'
    },
    {
      location: 'Barcelona Warehouse',
      month: 'Febrero 2024',
      increase: '+28%',
      emissions: 89.7,
      type: 'heating'
    },
    {
      location: 'Valencia Plant',
      month: 'Marzo 2024',
      increase: '+41%',
      emissions: 203.1,
      type: 'transport'
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitoreo de huella de carbono y gestión de créditos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Activity className="h-3 w-3" />
            Monitoreo Activo
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emisiones Totales
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmissions.toLocaleString()} tCO₂</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {monthlyChange < 0 ? (
                <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              )}
              {Math.abs(monthlyChange)}% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos de Compensación
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offsetCredits.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Disponibles para compensar
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ubicaciones Monitoreadas
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations}</div>
            <div className="text-xs text-muted-foreground">
              Activas este mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas de Picos
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{peakAlerts}</div>
            <div className="text-xs text-muted-foreground">
              Requieren atención
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consumo Mensual</CardTitle>
            <CardDescription>
              Monitoreo de emisiones con detección de picos automática
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyConsumptionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emisiones por Ubicación</CardTitle>
            <CardDescription>
              Distribución de emisiones por localización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsByLocationChart />
          </CardContent>
        </Card>
      </div>

      {/* Peak Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertas de Picos de Consumo
          </CardTitle>
          <CardDescription>
            Ubicaciones con incrementos significativos en emisiones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPeaks.map((peak, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 border-orange-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">{peak.location}</div>
                    <div className="text-sm text-muted-foreground">
                      {peak.month} • {peak.emissions} tCO₂ • {peak.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">{peak.increase}</Badge>
                  <Button variant="outline" size="sm">
                    Investigar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Towards Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso hacia Objetivos</CardTitle>
          <CardDescription>
            Metas de reducción de emisiones para 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Reducción de Emisiones</span>
              <span className="text-sm text-muted-foreground">67% completado</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Compensación con Créditos</span>
              <span className="text-sm text-muted-foreground">44% completado</span>
            </div>
            <Progress value={44} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Eficiencia Energética</span>
              <span className="text-sm text-muted-foreground">82% completado</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}