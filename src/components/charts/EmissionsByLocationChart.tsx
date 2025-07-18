import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

const data = [
  { name: 'Madrid Office', value: 847, color: '#3b82f6' },
  { name: 'Barcelona Warehouse', value: 623, color: '#10b981' },
  { name: 'Valencia Plant', value: 512, color: '#f59e0b' },
  { name: 'Sevilla Distribution', value: 389, color: '#ef4444' },
  { name: 'Bilbao Factory', value: 276, color: '#8b5cf6' },
  { name: 'Otros', value: 200, color: '#6b7280' },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.05) return null // Don't show labels for small slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-blue-600">
          {`${data.value.toLocaleString()} tCO₂`}
        </p>
        <p className="text-sm text-gray-500">
          {`${((data.value / 2847) * 100).toFixed(1)}% del total`}
        </p>
      </div>
    )
  }
  return null
}

export function EmissionsByLocationChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Custom Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="truncate">{entry.name}</span>
            <span className="text-muted-foreground ml-auto">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}