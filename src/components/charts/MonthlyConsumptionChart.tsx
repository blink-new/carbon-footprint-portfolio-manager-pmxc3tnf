import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts'
import { AlertTriangle } from 'lucide-react'

const data = [
  {
    month: 'Ene',
    emissions: 2100,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Feb',
    emissions: 2350,
    baseline: 2200,
    isPeak: true,
    peakIncrease: 6.8,
  },
  {
    month: 'Mar',
    emissions: 2180,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Abr',
    emissions: 2420,
    baseline: 2200,
    isPeak: true,
    peakIncrease: 10.0,
  },
  {
    month: 'May',
    emissions: 2050,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Jun',
    emissions: 2680,
    baseline: 2200,
    isPeak: true,
    peakIncrease: 21.8,
  },
  {
    month: 'Jul',
    emissions: 2290,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Ago',
    emissions: 2150,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Sep',
    emissions: 2380,
    baseline: 2200,
    isPeak: true,
    peakIncrease: 8.2,
  },
  {
    month: 'Oct',
    emissions: 2220,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
  {
    month: 'Nov',
    emissions: 2450,
    baseline: 2200,
    isPeak: true,
    peakIncrease: 11.4,
  },
  {
    month: 'Dec',
    emissions: 2320,
    baseline: 2200,
    isPeak: false,
    peakIncrease: 0,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{`${label} 2024`}</p>
        <p className="text-sm text-blue-600">
          {`Emisiones: ${payload[0].value.toLocaleString()} tCO₂`}
        </p>
        <p className="text-sm text-gray-500">
          {`Línea base: ${data.baseline.toLocaleString()} tCO₂`}
        </p>
        {data.isPeak && (
          <div className="flex items-center gap-1 mt-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <p className="text-sm text-orange-600 font-medium">
              {`Pico detectado: +${data.peakIncrease}%`}
            </p>
          </div>
        )}
      </div>
    )
  }
  return null
}

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props
  if (payload.isPeak) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#f97316"
          stroke="#fff"
          strokeWidth={2}
        />
        <AlertTriangle
          x={cx - 6}
          y={cy - 6}
          width={12}
          height={12}
          className="text-white"
        />
      </g>
    )
  }
  return <circle cx={cx} cy={cy} r={3} fill="#3b82f6" />
}

export function MonthlyConsumptionChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs"
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Baseline reference line */}
          <ReferenceLine 
            y={2200} 
            stroke="#6b7280" 
            strokeDasharray="5 5" 
            label={{ value: "Línea Base", position: "topRight" }}
          />
          
          {/* Main emissions line */}
          <Line
            type="monotone"
            dataKey="emissions"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Emisiones Mensuales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-500 border-dashed"></div>
          <span>Línea Base</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 text-orange-500" />
          <span>Picos Detectados</span>
        </div>
      </div>
    </div>
  )
}