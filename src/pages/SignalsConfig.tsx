import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertTriangle,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Bell,
  Activity,
  TrendingUp,
  FileText,
  Globe,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Signal {
  id: string
  name: string
  type: 'regulation_change' | 'emission_threshold' | 'market_price' | 'compliance_deadline' | 'carbon_tax'
  description: string
  locations: string[] // location IDs
  isActive: boolean
  priority: 'high' | 'medium' | 'low'
  conditions: {
    threshold?: number
    comparison?: 'greater_than' | 'less_than' | 'equals'
    timeframe?: 'daily' | 'weekly' | 'monthly'
    keywords?: string[]
  }
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  lastTriggered?: Date
  triggeredCount: number
  createdAt: Date
}

const mockSignals: Signal[] = [
  {
    id: '1',
    name: 'Cambios EU ETS',
    type: 'regulation_change',
    description: 'Monitorea cambios en la regulación del Sistema de Comercio de Emisiones de la UE',
    locations: ['1', '2', '3'], // Madrid, Barcelona, Valencia
    isActive: true,
    priority: 'high',
    conditions: {
      keywords: ['EU ETS', 'European Union Emissions Trading System', 'carbon allowances']
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    lastTriggered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    triggeredCount: 3,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Umbral Emisiones Madrid',
    type: 'emission_threshold',
    description: 'Alerta cuando las emisiones de Madrid Office superen 150 tCO₂ mensual',
    locations: ['1'], // Madrid Office
    isActive: true,
    priority: 'medium',
    conditions: {
      threshold: 150,
      comparison: 'greater_than',
      timeframe: 'monthly'
    },
    notifications: {
      email: true,
      push: true,
      sms: true
    },
    lastTriggered: new Date(Date.now() - 5 * 60 * 60 * 1000),
    triggeredCount: 1,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Precio Créditos Carbono',
    type: 'market_price',
    description: 'Notifica cuando el precio de créditos de carbono baje de €25/tCO₂',
    locations: ['1', '2', '3', '4'], // Todas las ubicaciones
    isActive: true,
    priority: 'low',
    conditions: {
      threshold: 25,
      comparison: 'less_than',
      timeframe: 'daily'
    },
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    triggeredCount: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    name: 'Fecha Límite Reporte',
    type: 'compliance_deadline',
    description: 'Recordatorio para presentar reporte anual de emisiones',
    locations: ['1', '2', '3'], // Oficinas principales
    isActive: false,
    priority: 'high',
    conditions: {
      timeframe: 'monthly'
    },
    notifications: {
      email: true,
      push: true,
      sms: true
    },
    triggeredCount: 2,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  }
]

const mockLocations = [
  { id: '1', name: 'Madrid Office' },
  { id: '2', name: 'Barcelona Warehouse' },
  { id: '3', name: 'Valencia Plant' },
  { id: '4', name: 'Sevilla Store' }
]

const signalTypes = [
  {
    value: 'regulation_change',
    label: 'Cambio Regulatorio',
    description: 'Monitorea cambios en regulaciones ambientales',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    value: 'emission_threshold',
    label: 'Umbral de Emisiones',
    description: 'Alerta cuando se superen límites de emisiones',
    icon: TrendingUp,
    color: 'text-red-600'
  },
  {
    value: 'market_price',
    label: 'Precio de Mercado',
    description: 'Monitorea precios de créditos de carbono',
    icon: Activity,
    color: 'text-green-600'
  },
  {
    value: 'compliance_deadline',
    label: 'Fecha Límite',
    description: 'Recordatorios de fechas de cumplimiento',
    icon: Calendar,
    color: 'text-orange-600'
  },
  {
    value: 'carbon_tax',
    label: 'Impuesto Carbono',
    description: 'Cambios en impuestos relacionados con carbono',
    icon: Globe,
    color: 'text-purple-600'
  }
]

const getSignalTypeConfig = (type: Signal['type']) => {
  return signalTypes.find(t => t.value === type) || signalTypes[0]
}

const getPriorityBadge = (priority: Signal['priority']) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">Alta</Badge>
    case 'medium':
      return <Badge variant="secondary">Media</Badge>
    case 'low':
      return <Badge variant="outline">Baja</Badge>
  }
}

export default function SignalsConfig() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'regulation_change' as Signal['type'],
    description: '',
    locations: [] as string[],
    priority: 'medium' as Signal['priority'],
    conditions: {
      threshold: 0,
      comparison: 'greater_than' as 'greater_than' | 'less_than' | 'equals',
      timeframe: 'monthly' as 'daily' | 'weekly' | 'monthly',
      keywords: [] as string[]
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  })
  
  const { toast } = useToast()

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || signal.type === filterType
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && signal.isActive) ||
                         (filterStatus === 'inactive' && !signal.isActive)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'regulation_change',
      description: '',
      locations: [],
      priority: 'medium',
      conditions: {
        threshold: 0,
        comparison: 'greater_than',
        timeframe: 'monthly',
        keywords: []
      },
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    })
  }

  const handleCreate = () => {
    const newSignal: Signal = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      triggeredCount: 0,
      createdAt: new Date()
    }
    
    setSignals(prev => [...prev, newSignal])
    setIsCreateDialogOpen(false)
    resetForm()
    
    toast({
      title: "Señal creada",
      description: `${newSignal.name} ha sido configurada correctamente.`,
    })
  }

  const handleEdit = (signal: Signal) => {
    setEditingSignal(signal)
    setFormData({
      name: signal.name,
      type: signal.type,
      description: signal.description,
      locations: signal.locations,
      priority: signal.priority,
      conditions: signal.conditions,
      notifications: signal.notifications
    })
  }

  const handleUpdate = () => {
    if (!editingSignal) return
    
    setSignals(prev => prev.map(signal => 
      signal.id === editingSignal.id 
        ? { ...signal, ...formData }
        : signal
    ))
    
    setEditingSignal(null)
    resetForm()
    
    toast({
      title: "Señal actualizada",
      description: `${formData.name} ha sido actualizada correctamente.`,
    })
  }

  const handleDelete = (signal: Signal) => {
    setSignals(prev => prev.filter(s => s.id !== signal.id))
    
    toast({
      title: "Señal eliminada",
      description: `${signal.name} ha sido eliminada correctamente.`,
      variant: "destructive"
    })
  }

  const toggleSignalStatus = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? { ...signal, isActive: !signal.isActive }
        : signal
    ))
  }

  const activeSignals = signals.filter(s => s.isActive).length
  const totalTriggers = signals.reduce((sum, s) => sum + s.triggeredCount, 0)
  const highPrioritySignals = signals.filter(s => s.priority === 'high' && s.isActive).length

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración de Señales</h1>
          <p className="text-muted-foreground">
            Configura alertas preventivas ante cambios en regulación ambiental
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Señal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Señal</DialogTitle>
              <DialogDescription>
                Configura una nueva señal preventiva para monitorear cambios regulatorios.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="conditions">Condiciones</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre de la señal</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Cambios EU ETS"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de señal</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: Signal['type']) => 
                      setFormData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {signalTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-4 w-4 ${type.color}`} />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe qué monitorea esta señal..."
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Ubicaciones afectadas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {mockLocations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`location-${location.id}`}
                          checked={formData.locations.includes(location.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                locations: [...prev.locations, location.id]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                locations: prev.locations.filter(id => id !== location.id)
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={`location-${location.id}`} className="text-sm">
                          {location.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value: Signal['priority']) => 
                      setFormData(prev => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="conditions" className="space-y-4">
                {(formData.type === 'emission_threshold' || formData.type === 'market_price') && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="threshold">Valor umbral</Label>
                      <Input
                        id="threshold"
                        type="number"
                        value={formData.conditions.threshold}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          conditions: { ...prev.conditions, threshold: Number(e.target.value) }
                        }))}
                        placeholder="Ej: 150"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="comparison">Condición</Label>
                      <Select 
                        value={formData.conditions.comparison} 
                        onValueChange={(value: 'greater_than' | 'less_than' | 'equals') => 
                          setFormData(prev => ({
                            ...prev,
                            conditions: { ...prev.conditions, comparison: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="greater_than">Mayor que</SelectItem>
                          <SelectItem value="less_than">Menor que</SelectItem>
                          <SelectItem value="equals">Igual a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="timeframe">Frecuencia de monitoreo</Label>
                  <Select 
                    value={formData.conditions.timeframe} 
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                      setFormData(prev => ({
                        ...prev,
                        conditions: { ...prev.conditions, timeframe: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.type === 'regulation_change' && (
                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Palabras clave (separadas por comas)</Label>
                    <Textarea
                      id="keywords"
                      value={formData.conditions.keywords?.join(', ') || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        conditions: { 
                          ...prev.conditions, 
                          keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                        }
                      }))}
                      placeholder="EU ETS, carbon tax, emissions trading"
                      rows={2}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe alertas en tu correo electrónico
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones en tiempo real en la aplicación
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Mensajes de texto para alertas críticas
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.sms}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: checked }
                      }))}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreate} 
                disabled={!formData.name || !formData.description || formData.locations.length === 0}
              >
                Crear Señal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Señales Activas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSignals}</div>
            <p className="text-xs text-muted-foreground">
              de {signals.length} configuradas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Disparadas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTriggers}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPrioritySignals}</div>
            <p className="text-xs text-muted-foreground">
              Señales críticas activas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Activación</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">
              Umbral Emisiones Madrid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Señales Configuradas</CardTitle>
              <CardDescription>
                Gestiona todas las señales preventivas configuradas
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar señales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {signalTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="inactive">Inactivas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSignals.map((signal) => {
              const typeConfig = getSignalTypeConfig(signal.type)
              const Icon = typeConfig.icon
              
              return (
                <div
                  key={signal.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10`}>
                      <Icon className={`h-5 w-5 ${typeConfig.color}`} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{signal.name}</h3>
                        {getPriorityBadge(signal.priority)}
                        {signal.isActive ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Activa
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Inactiva
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {signal.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {signal.locations.length} ubicaciones
                        </span>
                        <span className="flex items-center gap-1">
                          <Bell className="h-3 w-3" />
                          {signal.triggeredCount} activaciones
                        </span>
                        {signal.lastTriggered && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Última: {signal.lastTriggered.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={signal.isActive}
                      onCheckedChange={() => toggleSignalStatus(signal.id)}
                    />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(signal)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente 
                                la señal "{signal.name}" y todas sus configuraciones.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(signal)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
            
            {filteredSignals.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No se encontraron señales</p>
                {searchTerm && (
                  <p className="text-sm">Intenta con otros términos de búsqueda</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog - Similar structure to create dialog */}
      <Dialog open={!!editingSignal} onOpenChange={() => setEditingSignal(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Señal</DialogTitle>
            <DialogDescription>
              Modifica la configuración de la señal seleccionada.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="conditions">Condiciones</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre de la señal</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Cambios EU ETS"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Tipo de señal</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: Signal['type']) => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {signalTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className={`h-4 w-4 ${type.color}`} />
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe qué monitorea esta señal..."
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Ubicaciones afectadas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockLocations.map((location) => (
                    <div key={location.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-location-${location.id}`}
                        checked={formData.locations.includes(location.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              locations: [...prev.locations, location.id]
                            }))
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              locations: prev.locations.filter(id => id !== location.id)
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={`edit-location-${location.id}`} className="text-sm">
                        {location.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-priority">Prioridad</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value: Signal['priority']) => 
                    setFormData(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="conditions" className="space-y-4">
              {(formData.type === 'emission_threshold' || formData.type === 'market_price') && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-threshold">Valor umbral</Label>
                    <Input
                      id="edit-threshold"
                      type="number"
                      value={formData.conditions.threshold}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        conditions: { ...prev.conditions, threshold: Number(e.target.value) }
                      }))}
                      placeholder="Ej: 150"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-comparison">Condición</Label>
                    <Select 
                      value={formData.conditions.comparison} 
                      onValueChange={(value: 'greater_than' | 'less_than' | 'equals') => 
                        setFormData(prev => ({
                          ...prev,
                          conditions: { ...prev.conditions, comparison: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater_than">Mayor que</SelectItem>
                        <SelectItem value="less_than">Menor que</SelectItem>
                        <SelectItem value="equals">Igual a</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="edit-timeframe">Frecuencia de monitoreo</Label>
                <Select 
                  value={formData.conditions.timeframe} 
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                    setFormData(prev => ({
                      ...prev,
                      conditions: { ...prev.conditions, timeframe: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.type === 'regulation_change' && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-keywords">Palabras clave (separadas por comas)</Label>
                  <Textarea
                    id="edit-keywords"
                    value={formData.conditions.keywords?.join(', ') || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      conditions: { 
                        ...prev.conditions, 
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }
                    }))}
                    placeholder="EU ETS, carbon tax, emissions trading"
                    rows={2}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas en tu correo electrónico
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificaciones en tiempo real en la aplicación
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Mensajes de texto para alertas críticas
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked }
                    }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSignal(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleUpdate} 
              disabled={!formData.name || !formData.description || formData.locations.length === 0}
            >
              Actualizar Señal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}