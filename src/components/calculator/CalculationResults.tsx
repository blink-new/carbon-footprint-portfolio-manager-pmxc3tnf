import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Download,
  Share,
  Calculator,
  MapPin,
  TrendingUp,
  AlertTriangle,
  FileText,
  BarChart3,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface UploadedFile {
  id: string
  name: string
  type: 'xml' | 'pdf'
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  locations?: number
  emissions?: number
}

interface CalculationResultsProps {
  totalLocations: number
  totalEmissions: number
  files: UploadedFile[]
}

const emissionsByCategory = [
  { name: 'Electricidad', value: 1247, color: '#3b82f6' },
  { name: 'Calefacción', value: 892, color: '#ef4444' },
  { name: 'Transporte', value: 456, color: '#f59e0b' },
  { name: 'Procesos', value: 252, color: '#10b981' },
]

const monthlyTrend = [
  { month: 'Oct', emissions: 2680 },
  { month: 'Nov', emissions: 2450 },
  { month: 'Dic', emissions: 2320 },
  { month: 'Ene', emissions: 2847 },
]

export function CalculationResults({ totalLocations, totalEmissions, files }: CalculationResultsProps) {
  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resultados del Cálculo</CardTitle>
          <CardDescription>
            No hay resultados disponibles. Procesa archivos primero.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Los resultados aparecerán aquí después de procesar los archivos
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emisiones Totales
            </CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmissions.toLocaleString()} tCO₂</div>
            <p className="text-xs text-muted-foreground">
              Calculado desde {files.length} archivos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ubicaciones
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLocations}</div>
            <p className="text-xs text-muted-foreground">
              Detectadas automáticamente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio por Ubicación
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLocations > 0 ? (totalEmissions / totalLocations).toFixed(1) : '0'} tCO₂
            </div>
            <p className="text-xs text-muted-foreground">
              Por ubicación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Picos Detectados
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emisiones por Categoría</CardTitle>
            <CardDescription>
              Distribución de emisiones por tipo de fuente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionsByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {emissionsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tCO₂`, 'Emisiones']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia Mensual</CardTitle>
            <CardDescription>
              Evolución de emisiones en los últimos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} />
                  <Tooltip formatter={(value) => [`${value} tCO₂`, 'Emisiones']} />
                  <Bar dataKey="emissions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Archivos Procesados</CardTitle>
          <CardDescription>
            Resumen de archivos utilizados en el cálculo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={file.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.type.toUpperCase()} • {file.locations} ubicaciones • {file.emissions?.toLocaleString()} tCO₂
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">Procesado</Badge>
                </div>
                {index < files.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Resultados
        </Button>
        <Button variant="outline" className="gap-2">
          <Share className="h-4 w-4" />
          Compartir Informe
        </Button>
        <Button variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Ver Análisis Detallado
        </Button>
      </div>

      {/* Peak Detection Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Detección de Picos de Consumo
          </CardTitle>
          <CardDescription className="text-orange-700">
            Se han detectado 3 ubicaciones con incrementos significativos en emisiones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-orange-800">
            <p>• Madrid Office: +34% en enero (145.2 tCO₂)</p>
            <p>• Valencia Plant: +41% en marzo (203.1 tCO₂)</p>
            <p>• Barcelona Warehouse: +28% en febrero (89.7 tCO₂)</p>
          </div>
          <Button variant="outline" className="mt-4 border-orange-300 text-orange-800 hover:bg-orange-100">
            Investigar Picos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}