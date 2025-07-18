import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ShoppingCart,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Calendar,
  Shield,
  Leaf,
} from 'lucide-react'

const marketplaceCredits = [
  {
    id: '1',
    name: 'Reforestación Costa Rica',
    type: 'Forestry',
    price: 14.25,
    priceChange: 8.3,
    trend: 'up',
    available: 5000,
    vintage: '2024',
    certification: 'VCS',
    location: 'Costa Rica',
    rating: 4.8,
    description: 'Proyecto de reforestación en bosques tropicales con comunidades locales',
    features: ['Biodiversidad', 'Comunidades locales', 'Monitoreo satelital'],
    seller: 'EcoForest Solutions',
    delivery: '30 días',
  },
  {
    id: '2',
    name: 'Parque Eólico Patagonia',
    type: 'Renewable Energy',
    price: 11.80,
    priceChange: -2.1,
    trend: 'down',
    available: 8500,
    vintage: '2023',
    certification: 'CDM',
    location: 'Argentina',
    rating: 4.6,
    description: 'Generación de energía eólica en la región patagónica',
    features: ['Energía limpia', 'Desarrollo regional', 'Tecnología avanzada'],
    seller: 'WindPower Argentina',
    delivery: '15 días',
  },
  {
    id: '3',
    name: 'Captura Metano Ganadería',
    type: 'Methane Capture',
    price: 19.50,
    priceChange: 12.7,
    trend: 'up',
    available: 2500,
    vintage: '2024',
    certification: 'Gold Standard',
    location: 'Brasil',
    rating: 4.9,
    description: 'Captura y utilización de metano en granjas ganaderas',
    features: ['Reducción metano', 'Energía renovable', 'Agricultura sostenible'],
    seller: 'AgriCarbon Brasil',
    delivery: '45 días',
  },
  {
    id: '4',
    name: 'Conservación Manglares',
    type: 'Blue Carbon',
    price: 23.75,
    priceChange: 15.2,
    trend: 'up',
    available: 1800,
    vintage: '2024',
    certification: 'VCS',
    location: 'Indonesia',
    rating: 4.7,
    description: 'Protección y restauración de ecosistemas de manglares',
    features: ['Carbono azul', 'Protección costera', 'Biodiversidad marina'],
    seller: 'Blue Ocean Conservation',
    delivery: '60 días',
  },
  {
    id: '5',
    name: 'Solar Comunitaria México',
    type: 'Renewable Energy',
    price: 10.90,
    priceChange: 5.4,
    trend: 'up',
    available: 6200,
    vintage: '2023',
    certification: 'VCS',
    location: 'México',
    rating: 4.5,
    description: 'Instalaciones solares en comunidades rurales mexicanas',
    features: ['Acceso energético', 'Desarrollo comunitario', 'Tecnología solar'],
    seller: 'Solar Comunitario MX',
    delivery: '20 días',
  },
  {
    id: '6',
    name: 'Biochar Agricultura',
    type: 'Carbon Removal',
    price: 28.40,
    priceChange: 22.1,
    trend: 'up',
    available: 1200,
    vintage: '2024',
    certification: 'Gold Standard',
    location: 'Kenia',
    rating: 4.8,
    description: 'Producción de biochar para mejora de suelos agrícolas',
    features: ['Remoción permanente', 'Mejora suelos', 'Agricultura sostenible'],
    seller: 'African Biochar Initiative',
    delivery: '90 días',
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Forestry': return 'bg-green-100 text-green-800'
    case 'Renewable Energy': return 'bg-blue-100 text-blue-800'
    case 'Methane Capture': return 'bg-orange-100 text-orange-800'
    case 'Blue Carbon': return 'bg-cyan-100 text-cyan-800'
    case 'Carbon Removal': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getCertificationColor = (cert: string) => {
  switch (cert) {
    case 'VCS': return 'bg-blue-100 text-blue-800'
    case 'CDM': return 'bg-green-100 text-green-800'
    case 'Gold Standard': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function CreditsMarketplace() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mercado de Créditos</h1>
          <p className="text-muted-foreground">
            Compra y venta de créditos de carbono certificados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <ShoppingCart className="h-3 w-3" />
            24,200 créditos disponibles
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar proyectos de créditos de carbono..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="forestry">Forestry</SelectItem>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="methane">Methane Capture</SelectItem>
                  <SelectItem value="blue">Blue Carbon</SelectItem>
                  <SelectItem value="removal">Carbon Removal</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-cert">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cert">Certificación</SelectItem>
                  <SelectItem value="vcs">VCS</SelectItem>
                  <SelectItem value="cdm">CDM</SelectItem>
                  <SelectItem value="gold">Gold Standard</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="price-asc">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificación</SelectItem>
                  <SelectItem value="available">Más Disponibles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketplaceCredits.map((credit) => (
          <Card key={credit.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{credit.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {credit.seller}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{credit.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getTypeColor(credit.type)}>
                  {credit.type}
                </Badge>
                <Badge variant="outline" className={getCertificationColor(credit.certification)}>
                  {credit.certification}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground">
                {credit.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {credit.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Vintage {credit.vintage}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  Entrega en {credit.delivery}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Características:</div>
                <div className="flex flex-wrap gap-1">
                  {credit.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">${credit.price}</div>
                    <div className="text-xs text-muted-foreground">por crédito</div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    credit.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {credit.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {credit.trend === 'up' ? '+' : ''}{credit.priceChange}%
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {credit.available.toLocaleString()} créditos disponibles
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Comprar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Precio Promedio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17.23</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +5.2% esta semana
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volumen Disponible
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.2k</div>
            <div className="text-xs text-muted-foreground">
              Créditos en el mercado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Proyectos Activos
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="text-xs text-muted-foreground">
              Certificados disponibles
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calificación Promedio
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <div className="text-xs text-muted-foreground">
              De 5 estrellas
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}