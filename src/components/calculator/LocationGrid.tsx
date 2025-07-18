import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eye, 
  Search,
  Filter,
  Zap,
  Flame,
  Droplets,
  Fuel
} from 'lucide-react'
import { ProcessedFileData, LocationData, getTypeColor, getTypeLabel, formatEmissions, getEmissionColor } from '@/utils/fileProcessor'

interface UploadedFile {
  id: string
  name: string
  type: 'xml' | 'pdf'
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  processedData?: ProcessedFileData
}

interface LocationGridProps {
  files: UploadedFile[]
  processedData: ProcessedFileData[]
}

export function LocationGrid({ files, processedData }: LocationGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('emissions')

  // Combine all locations from processed data
  const allLocations = processedData.flatMap(data => data.locations)

  // Filter and sort locations
  const filteredLocations = allLocations
    .filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || location.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'emissions':
          return b.emissions - a.emissions
        case 'name':
          return a.name.localeCompare(b.name)
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Ubicaciones Detectadas</CardTitle>
          <CardDescription className="text-sm">
            No hay archivos procesados aún. Carga archivos XML o PDF para ver las ubicaciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
            <MapPin className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mb-4" />
            <p className="text-sm md:text-base text-muted-foreground">
              Las ubicaciones aparecerán aquí después de procesar los archivos
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with stats */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Ubicaciones Detectadas</CardTitle>
          <CardDescription className="text-sm">
            {allLocations.length} ubicaciones encontradas en {files.length} archivos procesados
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ubicaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="office">Oficina</SelectItem>
                    <SelectItem value="warehouse">Almacén</SelectItem>
                    <SelectItem value="factory">Fábrica</SelectItem>
                    <SelectItem value="distribution">Distribución</SelectItem>
                    <SelectItem value="hub">Centro</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emissions">Por emisiones</SelectItem>
                    <SelectItem value="name">Por nombre</SelectItem>
                    <SelectItem value="type">Por tipo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredLocations.length} de {allLocations.length} ubicaciones
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="relative hover:shadow-md transition-shadow">
            {location.peakAlert && (
              <div className="absolute top-3 right-3 z-10">
                <Badge variant="destructive" className="gap-1 text-xs">
                  <AlertTriangle className="h-3 w-3" />
                  Pico
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 min-w-0 flex-1 pr-2">
                  <CardTitle className="text-base md:text-lg truncate">{location.name}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
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
              {/* Emissions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Emisiones Totales</span>
                  <span className={`text-lg font-bold ${getEmissionColor(location.emissions)}`}>
                    {formatEmissions(location.emissions)}
                  </span>
                </div>
                
                {location.trend && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tendencia mensual</span>
                    <div className={`flex items-center gap-1 ${
                      location.trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {location.trend.direction === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {location.trend.direction === 'up' ? '+' : ''}{location.trend.percentage.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>

              {/* Consumption breakdown */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Consumo por Fuente</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-muted-foreground">Electricidad:</span>
                    <span className="font-medium">{location.consumptionData.electricity.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-muted-foreground">Gas:</span>
                    <span className="font-medium">{location.consumptionData.gas.toLocaleString()} m³</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3 w-3 text-blue-500" />
                    <span className="text-muted-foreground">Combustible:</span>
                    <span className="font-medium">{location.consumptionData.fuel.toLocaleString()} L</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-cyan-500" />
                    <span className="text-muted-foreground">Agua:</span>
                    <span className="font-medium">{location.consumptionData.water.toLocaleString()} m³</span>
                  </div>
                </div>
              </div>
              
              {/* Period and actions */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>Período: {location.period.start} - {location.period.end}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredLocations.length === 0 && allLocations.length > 0 && (
        <Card>
          <CardContent className="py-8 md:py-12">
            <div className="text-center">
              <Search className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron ubicaciones</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Intenta ajustar los filtros de búsqueda o el término de búsqueda
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setFilterType('all')
                }}
                className="text-sm"
              >
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary stats */}
      {filteredLocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen de Ubicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredLocations.filter(l => l.emissions < 100).length}
                </div>
                <div className="text-xs text-muted-foreground">Emisiones Bajas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {filteredLocations.filter(l => l.emissions >= 100 && l.emissions < 200).length}
                </div>
                <div className="text-xs text-muted-foreground">Emisiones Medias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {filteredLocations.filter(l => l.emissions >= 200).length}
                </div>
                <div className="text-xs text-muted-foreground">Emisiones Altas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredLocations.filter(l => l.peakAlert).length}
                </div>
                <div className="text-xs text-muted-foreground">Alertas de Pico</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}