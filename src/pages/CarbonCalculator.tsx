import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Upload,
  FileText,
  MapPin,
  Calculator,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
} from 'lucide-react'
import { FileDropZone } from '@/components/calculator/FileDropZone'
import { LocationGrid } from '@/components/calculator/LocationGrid'
import { CalculationResults } from '@/components/calculator/CalculationResults'

interface UploadedFile {
  id: string
  name: string
  type: 'xml' | 'pdf'
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  locations?: number
  emissions?: number
}

export default function CarbonCalculator() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')

  const handleFilesUploaded = useCallback((files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.toLowerCase().endsWith('.xml') ? 'xml' : 'pdf',
      size: file.size,
      status: 'pending',
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Simulate processing
    setIsProcessing(true)
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  status: 'processing' 
                }
              : f
          )
        )
        
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { 
                    ...f, 
                    status: 'completed',
                    locations: Math.floor(Math.random() * 50) + 10,
                    emissions: Math.floor(Math.random() * 500) + 100
                  }
                : f
            )
          )
          
          if (index === newFiles.length - 1) {
            setIsProcessing(false)
            setActiveTab('results')
          }
        }, 2000)
      }, index * 500)
    })
  }, [])

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const totalLocations = uploadedFiles.reduce((sum, file) => sum + (file.locations || 0), 0)
  const totalEmissions = uploadedFiles.reduce((sum, file) => sum + (file.emissions || 0), 0)
  const completedFiles = uploadedFiles.filter(f => f.status === 'completed').length

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calculadora de Huella de Carbono</h1>
          <p className="text-muted-foreground">
            Procesa archivos XML y PDF para calcular emisiones por ubicación
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <MapPin className="h-3 w-3" />
            {totalLocations} ubicaciones
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Calculator className="h-3 w-3" />
            {totalEmissions.toLocaleString()} tCO₂
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Cargar Archivos
          </TabsTrigger>
          <TabsTrigger value="locations" className="gap-2">
            <MapPin className="h-4 w-4" />
            Ubicaciones
          </TabsTrigger>
          <TabsTrigger value="results" className="gap-2">
            <Calculator className="h-4 w-4" />
            Resultados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* File Upload Zone */}
          <Card>
            <CardHeader>
              <CardTitle>Cargar Archivos</CardTitle>
              <CardDescription>
                Arrastra y suelta archivos XML y PDF para procesar datos de emisiones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileDropZone onFilesUploaded={handleFilesUploaded} />
            </CardContent>
          </Card>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Archivos Cargados</CardTitle>
                <CardDescription>
                  Estado del procesamiento de archivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {file.type.toUpperCase()} • {(file.size / 1024 / 1024).toFixed(2)} MB
                            {file.locations && ` • ${file.locations} ubicaciones`}
                            {file.emissions && ` • ${file.emissions.toLocaleString()} tCO₂`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {file.status === 'pending' && (
                          <Badge variant="secondary">Pendiente</Badge>
                        )}
                        {file.status === 'processing' && (
                          <Badge variant="outline" className="gap-1">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                            Procesando
                          </Badge>
                        )}
                        {file.status === 'completed' && (
                          <Badge variant="default" className="gap-1 bg-green-500">
                            <CheckCircle className="h-3 w-3" />
                            Completado
                          </Badge>
                        )}
                        {file.status === 'error' && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Error
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {isProcessing && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Procesando archivos...</span>
                      <span className="text-sm text-muted-foreground">
                        {completedFiles}/{uploadedFiles.length} completados
                      </span>
                    </div>
                    <Progress value={(completedFiles / uploadedFiles.length) * 100} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <LocationGrid files={uploadedFiles.filter(f => f.status === 'completed')} />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <CalculationResults 
            totalLocations={totalLocations}
            totalEmissions={totalEmissions}
            files={uploadedFiles.filter(f => f.status === 'completed')}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}