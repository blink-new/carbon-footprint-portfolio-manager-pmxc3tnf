import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Calculator,
  Briefcase,
  ShoppingCart,
  BarChart3,
  Settings,
  Leaf,
  MapPin,
  Bell,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    shortTitle: 'Inicio',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Calculadora',
    shortTitle: 'Calcular',
    url: '/calculator',
    icon: Calculator,
  },
  {
    title: 'Portafolio',
    shortTitle: 'Portafolio',
    url: '/portfolio',
    icon: Briefcase,
  },
  {
    title: 'Mercado',
    shortTitle: 'Mercado',
    url: '/marketplace',
    icon: ShoppingCart,
  },
  {
    title: 'Análisis',
    shortTitle: 'Análisis',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Ubicaciones',
    shortTitle: 'Ubicaciones',
    url: '/locations',
    icon: MapPin,
  },
  {
    title: 'Señales',
    shortTitle: 'Señales',
    url: '/signals',
    icon: Bell,
  },
  {
    title: 'Configuración',
    shortTitle: 'Config',
    url: '/settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Carbon Manager</span>
            <span className="truncate text-xs text-muted-foreground">
              Huella & Créditos
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-sm"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.title}</span>
                      <span className="sm:hidden">{item.shortTitle}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}