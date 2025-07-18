import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, TrendingUp, TrendingDown, AlertTriangle, Eye } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  type: 'xml' | 'pdf'
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  locations?: number
  emissions?: number
}

interface LocationGridProps {
  files: UploadedFile[]
}

// Mock location data
const mockLocations = [
  {
    id: '1',
    name: 'Madrid Office',
    address: 'Calle Gran Vía 28, Madrid',
    emissions: 145.2,
    trend: 'up',
    trendValue: 12.3,
    type: 'office',
    lastUpdate: '2024-01-15',
    peakAlert: true,
  },
  {
    id: '2',
    name: 'Barcelona Warehouse',
    address: 'Polígono Industrial, Barcelona',
    emissions: 89.7,
    trend: 'down',
    trendValue: -5.8,
    type: 'warehouse',
    lastUpdate: '2024-01-14',
    peakAlert: false,
  },
  {
    id: '3',
    name: 'Valencia Plant',
    address: 'Zona Industrial, Valencia',
    emissions: 203.1,
    trend: 'up',
    trendValue: 18.9,
    type: 'factory',
    lastUpdate: '2024-01-15',
    peakAlert: true,
  },
  {
    id: '4',
    name: 'Sevilla Distribution',
    address: 'Centro Logístico, Sevilla',
    emissions: 67.4,
    trend: 'down',
    trendValue: -3.2,
    type: 'distribution',
    lastUpdate: '2024-01-13',
    peakAlert: false,
  },
  {
    id: '5',
    name: 'Bilbao Factory',
    address: 'Polígono Ugaldeguren, Bilbao',
    emissions: 156.8,
    trend: 'up',
    trendValue: 7.1,
    type: 'factory',
    lastUpdate: '2024-01-15',
    peakAlert: false,
  },
  {
    id: '6',
    name: 'Zaragoza Hub',
    address: 'Plaza Logística, Zaragoza',
    emissions: 92.3,
    trend: 'down',
    trendValue: -8.4,
    type: 'hub',
    lastUpdate: '2024-01-14',
    peakAlert: false,
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'office': return 'bg-blue-100 text-blue-800'
    case 'warehouse': return 'bg-green-100 text-green-800'
    case 'factory': return 'bg-orange-100 text-orange-800'
    case 'distribution': return 'bg-purple-100 text-purple-800'
    case 'hub': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'office': return 'Oficina'
    case 'warehouse': return 'Almacén'
    case 'factory': return 'Fábrica'
    case 'distribution': return 'Distribución'
    case 'hub': return 'Centro'
    default: return 'Otro'
  }
}

export function LocationGrid({ files }: LocationGridProps) {
  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ubicaciones Detectadas</CardTitle>
          <CardDescription>
            No hay archivos procesados aún. Carga archivos XML o PDF para ver las ubicaciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Las ubicaciones aparecerán aquí después de procesar los archivos
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ubicaciones Detectadas</CardTitle>
          <CardDescription>
            {mockLocations.length} ubicaciones encontradas en {files.length} archivos procesados
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLocations.map((location) => (
          <Card key={location.id} className="relative">
            {location.peakAlert && (
              <div className="absolute top-3 right-3">
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Pico
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {location.address}
                  </CardDescription>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`w-fit text-xs ${getTypeColor(location.type)}`}
              >
                {getTypeLabel(location.type)}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Emisiones</span>
                  <span className="text-lg font-bold">
                    {location.emissions.toLocaleString()} tCO₂
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tendencia mensual</span>
                  <div className={`flex items-center gap-1 ${
                    location.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {location.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {location.trend === 'up' ? '+' : ''}{location.trendValue}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Actualizado: {location.lastUpdate}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}