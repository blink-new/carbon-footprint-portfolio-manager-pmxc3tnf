import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Settings,
  MoreHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'warning'
  title: string
  message: string
  location?: string
  timestamp: Date
  read: boolean
  priority: 'high' | 'medium' | 'low'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Pico de Consumo Detectado',
    message: 'Incremento del 45% en emisiones de electricidad',
    location: 'Madrid Office',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Nueva Regulación Ambiental',
    message: 'Cambios en normativa EU ETS que pueden afectar tus créditos',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'info',
    title: 'Procesamiento Completado',
    message: 'Se han procesado 15 archivos XML correctamente',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'success',
    title: 'Compensación Realizada',
    message: '250 tCO₂ compensadas con créditos forestales',
    location: 'Barcelona Warehouse',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'alert',
    title: 'Umbral de Emisiones Superado',
    message: 'Las emisiones mensuales han superado el objetivo establecido',
    location: 'Valencia Plant',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: false,
    priority: 'high'
  }
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-orange-500" />
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />
  }
}

const getNotificationBgColor = (type: Notification['type'], read: boolean) => {
  if (read) return 'bg-muted/30'
  
  switch (type) {
    case 'alert':
      return 'bg-red-50 border-red-200'
    case 'warning':
      return 'bg-orange-50 border-orange-200'
    case 'success':
      return 'bg-green-50 border-green-200'
    case 'info':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-background'
  }
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `hace ${minutes} min`
  } else if (hours < 24) {
    return `hace ${hours}h`
  } else {
    return `hace ${days}d`
  }
}

export function AppHeader() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  const highPriorityCount = notifications.filter(n => !n.read && n.priority === 'high').length
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Carbon Manager</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant={highPriorityCount > 0 ? "destructive" : "default"}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle>Notificaciones</SheetTitle>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Marcar todas como leídas
                    </Button>
                  )}
                </div>
                <SheetDescription>
                  {unreadCount > 0 
                    ? `Tienes ${unreadCount} notificaciones sin leer`
                    : 'Todas las notificaciones están al día'
                  }
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay notificaciones</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 rounded-lg border transition-colors cursor-pointer",
                        getNotificationBgColor(notification.type, notification.read),
                        !notification.read && "border-l-4"
                      )}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className={cn(
                                "text-sm font-medium",
                                !notification.read && "font-semibold"
                              )}>
                                {notification.title}
                              </h4>
                              {notification.priority === 'high' && !notification.read && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                  Urgente
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{formatTimestamp(notification.timestamp)}</span>
                              {notification.location && (
                                <>
                                  <span>•</span>
                                  <span>{notification.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Marcar como leída
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Notificaciones
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}