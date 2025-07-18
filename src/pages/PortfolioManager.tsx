import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
  Eye,
  Edit,
  Trash2,
  Leaf,
} from 'lucide-react'

const portfolioSummary = {
  totalCredits: 1250,
  usedCredits: 847,
  availableCredits: 403,
  totalValue: 18750,
  monthlyChange: 12.3,
}

const creditPortfolios = [
  {
    id: '1',
    name: 'Reforestación Amazónica',
    type: 'Forestry',
    credits: 500,
    price: 15.50,
    value: 7750,
    vintage: '2024',
    status: 'active',
    certification: 'VCS',
    location: 'Brasil',
    trend: 'up',
    change: 8.2,
  },
  {
    id: '2',
    name: 'Energía Solar India',
    type: 'Renewable Energy',
    credits: 300,
    price: 12.25,
    value: 3675,
    vintage: '2023',
    status: 'active',
    certification: 'CDM',
    location: 'India',
    trend: 'up',
    change: 15.7,
  },
  {
    id: '3',
    name: 'Captura de Metano',
    type: 'Methane Capture',
    credits: 200,
    price: 18.75,
    value: 3750,
    vintage: '2024',
    status: 'active',
    certification: 'Gold Standard',
    location: 'Estados Unidos',
    trend: 'down',
    change: -3.1,
  },
  {
    id: '4',
    name: 'Conservación Marina',
    type: 'Blue Carbon',
    credits: 250,
    price: 22.00,
    value: 5500,
    vintage: '2024',
    status: 'pending',
    certification: 'VCS',
    location: 'Indonesia',
    trend: 'up',
    change: 11.4,
  },
]

const offsetHistory = [
  {
    date: '2024-01-15',
    location: 'Madrid Office',
    credits: 145,
    emissions: 145.2,
    percentage: 99.9,
    project: 'Reforestación Amazónica',
  },
  {
    date: '2024-01-10',
    location: 'Valencia Plant',
    credits: 203,
    emissions: 203.1,
    percentage: 100.0,
    project: 'Energía Solar India',
  },
  {
    date: '2024-01-08',
    location: 'Barcelona Warehouse',
    credits: 90,
    emissions: 89.7,
    percentage: 100.3,
    project: 'Captura de Metano',
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Forestry': return 'bg-green-100 text-green-800'
    case 'Renewable Energy': return 'bg-blue-100 text-blue-800'
    case 'Methane Capture': return 'bg-orange-100 text-orange-800'
    case 'Blue Carbon': return 'bg-cyan-100 text-cyan-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'retired': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function PortfolioManager() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestor de Portafolio</h1>
          <p className="text-muted-foreground">
            Gestión de créditos de carbono y compensaciones
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Créditos
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Totales
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioSummary.totalCredits.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +{portfolioSummary.monthlyChange}% este mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Disponibles
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{portfolioSummary.availableCredits}</div>
            <div className="text-xs text-muted-foreground">
              Para compensaciones futuras
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor del Portafolio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioSummary.totalValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Valor de mercado actual
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilización
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((portfolioSummary.usedCredits / portfolioSummary.totalCredits) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {portfolioSummary.usedCredits} de {portfolioSummary.totalCredits} utilizados
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="offsets">Compensaciones</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Créditos de Carbono</CardTitle>
              <CardDescription>
                Gestión de tu portafolio de créditos de compensación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditPortfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{portfolio.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {portfolio.location} • {portfolio.vintage} • {portfolio.certification}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getTypeColor(portfolio.type)}>
                            {portfolio.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(portfolio.status)}>
                            {portfolio.status === 'active' ? 'Activo' : 
                             portfolio.status === 'pending' ? 'Pendiente' : 'Retirado'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="font-medium">{portfolio.credits.toLocaleString()} créditos</div>
                      <div className="text-sm text-muted-foreground">
                        ${portfolio.price}/crédito • ${portfolio.value.toLocaleString()}
                      </div>
                      <div className={`flex items-center justify-end gap-1 text-xs ${
                        portfolio.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {portfolio.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {portfolio.trend === 'up' ? '+' : ''}{portfolio.change}%
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offsets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Compensaciones</CardTitle>
              <CardDescription>
                Registro de compensaciones realizadas por ubicación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {offsetHistory.map((offset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{offset.location}</div>
                        <div className="text-sm text-muted-foreground">
                          {offset.date} • {offset.project}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">
                        {offset.credits} créditos utilizados
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {offset.emissions} tCO₂ • {offset.percentage}% compensado
                      </div>
                    </div>
                    
                    <Badge 
                      variant={offset.percentage >= 100 ? 'default' : 'secondary'}
                      className={offset.percentage >= 100 ? 'bg-green-100 text-green-800' : ''}
                    >
                      {offset.percentage >= 100 ? 'Completado' : 'Parcial'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compensation Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso de Compensación</CardTitle>
              <CardDescription>
                Estado actual de compensaciones por ubicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Madrid Office</span>
                  <span className="text-sm text-muted-foreground">100% compensado</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Valencia Plant</span>
                  <span className="text-sm text-muted-foreground">100% compensado</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Barcelona Warehouse</span>
                  <span className="text-sm text-muted-foreground">100% compensado</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sevilla Distribution</span>
                  <span className="text-sm text-muted-foreground">67% compensado</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bilbao Factory</span>
                  <span className="text-sm text-muted-foreground">45% compensado</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución del Portafolio</CardTitle>
                <CardDescription>
                  Composición por tipo de proyecto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Forestry</span>
                    </div>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Renewable Energy</span>
                    </div>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm">Blue Carbon</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Methane Capture</span>
                    </div>
                    <span className="text-sm font-medium">16%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rendimiento del Portafolio</CardTitle>
                <CardDescription>
                  Evolución del valor en los últimos 12 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valor inicial</span>
                    <span className="text-sm font-medium">$16,750</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valor actual</span>
                    <span className="text-sm font-medium">$18,750</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ganancia</span>
                    <span className="text-sm font-medium text-green-600">+$2,000 (+11.9%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Créditos utilizados</span>
                    <span className="text-sm font-medium">847 créditos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}