import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  AlertTriangle,
  Save,
  Download,
  Upload,
} from 'lucide-react'

export default function Settings() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Gestiona tu cuenta y preferencias de la aplicación
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Monitoreo
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            Datos
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>
                Actualiza tu información personal y de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" defaultValue="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" defaultValue="Pérez" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="juan.perez@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" defaultValue="EcoSolutions S.A." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" defaultValue="Gerente de Sostenibilidad" />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias Regionales</CardTitle>
              <CardDescription>
                Configura tu zona horaria y formato de datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="europe/madrid">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/madrid">Europa/Madrid</SelectItem>
                      <SelectItem value="america/mexico">América/México</SelectItem>
                      <SelectItem value="america/bogota">América/Bogotá</SelectItem>
                      <SelectItem value="america/argentina">América/Argentina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="mxn">MXN ($)</SelectItem>
                      <SelectItem value="cop">COP ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>
                Configura qué notificaciones quieres recibir por correo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Picos de Consumo</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando se detecten picos significativos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reportes Mensuales</Label>
                  <p className="text-sm text-muted-foreground">
                    Resumen mensual de emisiones y compensaciones
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Actualizaciones del Mercado</Label>
                  <p className="text-sm text-muted-foreground">
                    Cambios de precios y nuevos créditos disponibles
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recordatorios de Compensación</Label>
                  <p className="text-sm text-muted-foreground">
                    Recordatorios para compensar emisiones pendientes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones Push</CardTitle>
              <CardDescription>
                Configuración de notificaciones en tiempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas Críticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Picos extremos que requieren atención inmediata
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Procesamiento Completado</Label>
                  <p className="text-sm text-muted-foreground">
                    Cuando termine el procesamiento de archivos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Monitoreo</CardTitle>
              <CardDescription>
                Ajusta los parámetros para la detección de picos de consumo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="peakThreshold">Umbral de Pico (%)</Label>
                  <Input 
                    id="peakThreshold" 
                    type="number" 
                    defaultValue="20" 
                    min="5" 
                    max="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Incremento mínimo para considerar un pico
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baselinePeriod">Período Base (meses)</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 mes</SelectItem>
                      <SelectItem value="3">3 meses</SelectItem>
                      <SelectItem value="6">6 meses</SelectItem>
                      <SelectItem value="12">12 meses</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Período para calcular la línea base
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monitoringFreq">Frecuencia de Monitoreo</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Tiempo Real</SelectItem>
                    <SelectItem value="hourly">Cada Hora</SelectItem>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Tipos de Alertas</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Picos de Electricidad</Label>
                      <p className="text-xs text-muted-foreground">
                        Incrementos en consumo eléctrico
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Picos de Calefacción</Label>
                      <p className="text-xs text-muted-foreground">
                        Incrementos en sistemas de calefacción
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Picos de Transporte</Label>
                      <p className="text-xs text-muted-foreground">
                        Incrementos en emisiones de transporte
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Datos</CardTitle>
              <CardDescription>
                Importa, exporta y gestiona tus datos de emisiones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Importar Datos
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Datos
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Retención de Datos</Label>
                <Select defaultValue="24">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="indefinite">Indefinido</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tiempo que se conservarán los datos históricos
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Formato de Exportación</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="csv" defaultChecked />
                    <Label htmlFor="csv" className="text-sm">CSV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="excel" defaultChecked />
                    <Label htmlFor="excel" className="text-sm">Excel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="json" />
                    <Label htmlFor="json" className="text-sm">JSON</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integración de APIs</CardTitle>
              <CardDescription>
                Conecta con sistemas externos para importar datos automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Clave API</Label>
                <Input id="apiKey" type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL de Webhook</Label>
                <Input id="webhookUrl" placeholder="https://tu-sistema.com/webhook" />
              </div>
              <Button variant="outline">Probar Conexión</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>
                Gestiona la seguridad y privacidad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña Actual</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Cambiar Contraseña</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">
                      Añade una capa extra de seguridad a tu cuenta
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Sesiones Activas</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Navegador Actual</div>
                      <div className="text-sm text-muted-foreground">
                        Chrome en Windows • Madrid, España
                      </div>
                    </div>
                    <Badge variant="outline">Activa</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Aplicación Móvil</div>
                      <div className="text-sm text-muted-foreground">
                        iOS App • Última actividad: hace 2 días
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Cerrar Sesión</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}