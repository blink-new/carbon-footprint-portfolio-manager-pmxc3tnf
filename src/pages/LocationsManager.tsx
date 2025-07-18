import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
import {
  MapPin,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Building,
  Factory,
  Home,
  Store,
  Warehouse,
  Activity,
  AlertTriangle,
  CheckCircle,
  Search,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Location {
  id: string
  name: string
  type: 'office' | 'warehouse' | 'factory' | 'store' | 'home' | 'other'
  address: string
  city: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
  status: 'active' | 'inactive' | 'monitoring'
  monthlyEmissions: number
  lastUpdate: Date
  alertsCount: number
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Madrid Office',
    type: 'office',
    address: 'Calle Gran Vía, 123',
    city: 'Madrid',
    country: 'España',
    coordinates: { lat: 40.4168, lng: -3.7038 },
    description: 'Oficina principal con 150 empleados',
    status: 'active',
    monthlyEmissions: 145.2,
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    alertsCount: 2
  },
  {
    id: '2',
    name: 'Barcelona Warehouse',
    type: 'warehouse',
    address: 'Polígono Industrial Can Batlló',
    city: 'Barcelona',
    country: 'España',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    description: 'Centro de distribución principal',
    status: 'monitoring',
    monthlyEmissions: 89.7,
    lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000),
    alertsCount: 1
  },
  {
    id: '3',
    name: 'Valencia Plant',
    type: 'factory',
    address: 'Zona Industrial Norte',
    city: 'Valencia',
    country: 'España',
    coordinates: { lat: 39.4699, lng: -0.3763 },
    description: 'Planta de producción con líneas automatizadas',
    status: 'active',
    monthlyEmissions: 203.1,
    lastUpdate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    alertsCount: 3
  },
  {
    id: '4',
    name: 'Sevilla Store',
    type: 'store',
    address: 'Calle Sierpes, 45',
    city: 'Sevilla',
    country: 'España',
    status: 'inactive',
    monthlyEmissions: 23.4,
    lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    alertsCount: 0
  }
]

const locationTypes = [
  { value: 'office', label: 'Oficina', icon: Building },
  { value: 'warehouse', label: 'Almacén', icon: Warehouse },
  { value: 'factory', label: 'Fábrica', icon: Factory },
  { value: 'store', label: 'Tienda', icon: Store },
  { value: 'home', label: 'Hogar', icon: Home },
  { value: 'other', label: 'Otro', icon: MapPin },
]

const getLocationIcon = (type: Location['type']) => {
  const typeConfig = locationTypes.find(t => t.value === type)
  const Icon = typeConfig?.icon || MapPin
  return <Icon className="h-4 w-4" />
}

const getStatusBadge = (status: Location['status']) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="gap-1">
        <CheckCircle className="h-3 w-3" />
        Activa
      </Badge>
    case 'monitoring':
      return <Badge variant="secondary" className="gap-1">
        <Activity className="h-3 w-3" />
        Monitoreando
      </Badge>
    case 'inactive':
      return <Badge variant="outline" className="gap-1">
        Inactiva
      </Badge>
  }
}

export default function LocationsManager() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'office' as Location['type'],
    address: '',
    city: '',
    country: 'España',
    description: '',
    status: 'active' as Location['status']
  })
  
  const { toast } = useToast()

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'office',
      address: '',
      city: '',
      country: 'España',
      description: '',
      status: 'active'
    })
  }

  const handleCreate = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      ...formData,
      monthlyEmissions: 0,
      lastUpdate: new Date(),
      alertsCount: 0
    }
    
    setLocations(prev => [...prev, newLocation])
    setIsCreateDialogOpen(false)
    resetForm()
    
    toast({
      title: "Ubicación creada",
      description: `${newLocation.name} ha sido agregada correctamente.`,
    })
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setFormData({
      name: location.name,
      type: location.type,
      address: location.address,
      city: location.city,
      country: location.country,
      description: location.description || '',
      status: location.status
    })
  }

  const handleUpdate = () => {
    if (!editingLocation) return
    
    setLocations(prev => prev.map(loc => 
      loc.id === editingLocation.id 
        ? { ...loc, ...formData, lastUpdate: new Date() }
        : loc
    ))
    
    setEditingLocation(null)
    resetForm()
    
    toast({
      title: "Ubicación actualizada",
      description: `${formData.name} ha sido actualizada correctamente.`,
    })
  }

  const handleDelete = (location: Location) => {
    setLocations(prev => prev.filter(loc => loc.id !== location.id))
    
    toast({
      title: "Ubicación eliminada",
      description: `${location.name} ha sido eliminada correctamente.`,
      variant: "destructive"
    })
  }

  const totalEmissions = locations.reduce((sum, loc) => sum + loc.monthlyEmissions, 0)
  const activeLocations = locations.filter(loc => loc.status === 'active').length
  const totalAlerts = locations.reduce((sum, loc) => sum + loc.alertsCount, 0)

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Ubicaciones</h1>
          <p className="text-muted-foreground">
            Administra todas las ubicaciones que monitoreamos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Ubicación
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Ubicación</DialogTitle>
              <DialogDescription>
                Agrega una nueva ubicación para monitorear sus emisiones de carbono.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la ubicación</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Madrid Office"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de ubicación</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: Location['type']) => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Calle, número"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Madrid"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="España"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción de la ubicación..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Estado inicial</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: Location['status']) => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="monitoring">Monitoreando</SelectItem>
                    <SelectItem value="inactive">Inactiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate} disabled={!formData.name || !formData.address}>
                Crear Ubicación
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ubicaciones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeLocations} activas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emisiones Totales</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmissions.toFixed(1)} tCO₂</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Emisiones</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {locations.length > 0 ? (totalEmissions / locations.length).toFixed(1) : '0'} tCO₂
            </div>
            <p className="text-xs text-muted-foreground">
              Por ubicación
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ubicaciones</CardTitle>
              <CardDescription>
                Lista de todas las ubicaciones monitoreadas
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ubicaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{location.name}</h3>
                      {getStatusBadge(location.status)}
                      {location.alertsCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {location.alertsCount} alertas
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {location.address}, {location.city}, {location.country}
                    </div>
                    {location.description && (
                      <div className="text-xs text-muted-foreground">
                        {location.description}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{location.monthlyEmissions} tCO₂</div>
                    <div className="text-xs text-muted-foreground">
                      Actualizado {new Date(location.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(location)}>
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
                              la ubicación "{location.name}" y todos sus datos asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(location)}
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
            ))}
            
            {filteredLocations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No se encontraron ubicaciones</p>
                {searchTerm && (
                  <p className="text-sm">Intenta con otros términos de búsqueda</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingLocation} onOpenChange={() => setEditingLocation(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Ubicación</DialogTitle>
            <DialogDescription>
              Modifica los datos de la ubicación seleccionada.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nombre de la ubicación</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Madrid Office"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Tipo de ubicación</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: Location['type']) => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Dirección</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Calle, número"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-city">Ciudad</Label>
                <Input
                  id="edit-city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Madrid"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-country">País</Label>
                <Input
                  id="edit-country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="España"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción (opcional)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción de la ubicación..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: Location['status']) => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="monitoring">Monitoreando</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLocation(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.name || !formData.address}>
              Actualizar Ubicación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}