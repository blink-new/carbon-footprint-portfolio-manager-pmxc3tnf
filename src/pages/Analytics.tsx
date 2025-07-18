import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Eye,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  ReferenceLine,
} from 'recharts'

const monthlyData = [
  { month: 'Ene', emissions: 2100, baseline: 2200, peaks: 2, efficiency: 85 },
  { month: 'Feb', emissions: 2350, baseline: 2200, peaks: 3, efficiency: 78 },
  { month: 'Mar', emissions: 2180, baseline: 2200, peaks: 1, efficiency: 88 },
  { month: 'Abr', emissions: 2420, baseline: 2200, peaks: 4, efficiency: 72 },
  { month: 'May', emissions: 2050, baseline: 2200, peaks: 0, efficiency: 92 },
  { month: 'Jun', emissions: 2680, baseline: 2200, peaks: 5, efficiency: 65 },
  { month: 'Jul', emissions: 2290, baseline: 2200, peaks: 2, efficiency: 82 },
  { month: 'Ago', emissions: 2150, baseline: 2200, peaks: 1, efficiency: 89 },
  { month: 'Sep', emissions: 2380, baseline: 2200, peaks: 3, efficiency: 76 },
  { month: 'Oct', emissions: 2220, baseline: 2200, peaks: 1, efficiency: 86 },
  { month: 'Nov', emissions: 2450, baseline: 2200, peaks: 4, efficiency: 74 },
  { month: 'Dic', emissions: 2320, baseline: 2200, peaks: 2, efficiency: 81 },
]

const peakAnalysis = [
  {
    month: 'Junio',
    location: 'Madrid Office',
    increase: 41.2,
    cause: 'Sistema de climatización',
    impact: 'Alto',
    status: 'Investigando',
  },
  {
    month: 'Abril',
    location: 'Valencia Plant',
    increase: 28.7,
    cause: 'Aumento producción',
    impact: 'Medio',
    status: 'Resuelto',
  },
  {
    month: 'Noviembre',
    location: 'Barcelona Warehouse',
    increase: 34.1,
    cause: 'Calefacción defectuosa',
    impact: 'Alto',
    status: 'En progreso',
  },
  {
    month: 'Febrero',
    location: 'Sevilla Distribution',
    increase: 22.3,
    cause: 'Pico de demanda',
    impact: 'Bajo',
    status: 'Resuelto',
  },
]

const locationTrends = [
  { name: 'Madrid Office', current: 145.2, previous: 108.4, trend: 'up', change: 33.9 },
  { name: 'Valencia Plant', current: 203.1, previous: 157.8, trend: 'up', change: 28.7 },
  { name: 'Barcelona Warehouse', current: 89.7, previous: 95.2, trend: 'down', change: -5.8 },
  { name: 'Sevilla Distribution', current: 67.4, previous: 69.8, trend: 'down', change: -3.4 },
  { name: 'Bilbao Factory', current: 156.8, previous: 146.3, trend: 'up', change: 7.2 },
]

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m')
  const [selectedMetric, setSelectedMetric] = useState('emissions')

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Análisis avanzado de emisiones y detección de picos de consumo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="12m">12 meses</SelectItem>
              <SelectItem value="24m">24 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Picos Detectados
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">27</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              +12% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia Promedio
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +3.4% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Variabilidad
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">±18.3%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              -2.1% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-xs text-muted-foreground">
              Requieren acción inmediata
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="peaks">Análisis de Picos</TabsTrigger>
          <TabsTrigger value="locations">Por Ubicación</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Emisiones con Detección de Picos</CardTitle>
              <CardDescription>
                Monitoreo mensual con identificación automática de anomalías
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 6]} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'peaks') return [`${value} picos`, 'Picos detectados']
                        if (name === 'emissions') return [`${value} tCO₂`, 'Emisiones']
                        if (name === 'baseline') return [`${value} tCO₂`, 'Línea base']
                        return [value, name]
                      }}
                    />
                    
                    <ReferenceLine yAxisId="left" y={2200} stroke="#6b7280" strokeDasharray="5 5" />
                    
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="emissions"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                    
                    <Bar
                      yAxisId="right"
                      dataKey="peaks"
                      fill="#f97316"
                      opacity={0.7}
                      name="peaks"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Detallado de Picos</CardTitle>
              <CardDescription>
                Investigación de incrementos significativos en consumo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peakAnalysis.map((peak, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">{peak.location}</div>
                        <div className="text-sm text-muted-foreground">
                          {peak.month} • +{peak.increase}% • {peak.cause}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={peak.impact === 'Alto' ? 'destructive' : peak.impact === 'Medio' ? 'default' : 'secondary'}
                      >
                        {peak.impact}
                      </Badge>
                      <Badge 
                        variant={peak.status === 'Resuelto' ? 'default' : 'outline'}
                        className={peak.status === 'Resuelto' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {peak.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis por Ubicación</CardTitle>
              <CardDescription>
                Comparación de tendencias entre ubicaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationTrends.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Actual: {location.current} tCO₂ • Anterior: {location.previous} tCO₂
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 ${
                        location.trend === 'up' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {location.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {location.trend === 'up' ? '+' : ''}{location.change.toFixed(1)}%
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eficiencia Energética</CardTitle>
              <CardDescription>
                Análisis de eficiencia y correlación con picos de consumo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[60, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 6]} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'efficiency') return [`${value}%`, 'Eficiencia']
                        if (name === 'peaks') return [`${value} picos`, 'Picos detectados']
                        return [value, name]
                      }}
                    />
                    
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                    
                    <Bar
                      yAxisId="right"
                      dataKey="peaks"
                      fill="#f97316"
                      opacity={0.7}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}