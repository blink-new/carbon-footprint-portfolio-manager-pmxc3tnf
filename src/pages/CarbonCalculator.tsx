import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import {
  Upload,
  FileText,
  MapPin,
  Calculator,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Loader2,
} from 'lucide-react'
import { FileDropZone } from '@/components/calculator/FileDropZone'
import { LocationGrid } from '@/components/calculator/LocationGrid'
import { CalculationResults } from '@/components/calculator/CalculationResults'
import { processFile, ProcessedFileData } from '@/utils/fileProcessor'

interface UploadedFile {
  id: string
  name: string
  type: 'xml' | 'pdf'
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
  processedData?: ProcessedFileData
}

export default function CarbonCalculator() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const { toast } = useToast()

  const handleFilesUploaded = useCallback(async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.toLowerCase().endsWith('.xml') ? 'xml' : 'pdf',
      size: file.size,
      status: 'pending',
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
    setIsProcessing(true)
    
    // Process files one by one
    for (let i = 0; i < newFiles.length; i++) {
      const file = files[i]
      const fileData = newFiles[i]
      
      try {
        // Update status to processing
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { ...f, status: 'processing' }
              : f
          )
        )
        
        // Process the file
        const processedData = await processFile(file)
        
        // Update with results
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { 
                  ...f, 
                  status: 'completed',
                  processedData
                }
              : f
          )
        )
        
        toast({
          title: "Archivo procesado",
          description: `${file.name} - ${processedData.locations.length} ubicaciones detectadas`,
        })
        
      } catch (error) {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { 
                  ...f, 
                  status: 'error',
                  error: error.message
                }
              : f
          )
        )
        
        toast({
          title: "Error procesando archivo",
          description: `${file.name}: ${error.message}`,
          variant: "destructive",
        })
      }
    }
    
    setIsProcessing(false)
    
    // Switch to results tab if we have completed files
    const hasCompletedFiles = newFiles.some(() => true)
    if (hasCompletedFiles) {
      setTimeout(() => setActiveTab('results'), 500)
    }
  }, [toast])

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    toast({
      title: "Archivo eliminado",
      description: "El archivo ha sido eliminado de la lista",
    })
  }

  const retryFile = async (fileId: string) => {
    const fileToRetry = uploadedFiles.find(f => f.id === fileId)
    if (!fileToRetry) return
    
    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'processing', error: undefined }
          : f
      )
    )
    
    // Note: In a real implementation, you'd need to store the original File object
    // For now, we'll simulate a retry
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'error', error: 'Archivo original no disponible para reintentar' }
            : f
        )
      )
    }, 2000)
  }

  // Calculate totals from processed data
  const completedFiles = uploadedFiles.filter(f => f.status === 'completed')
  const totalLocations = completedFiles.reduce((sum, file) => 
    sum + (file.processedData?.locations.length || 0), 0
  )
  const totalEmissions = completedFiles.reduce((sum, file) => 
    sum + (file.processedData?.totalEmissions || 0), 0
  )
  const processingProgress = uploadedFiles.length > 0 
    ? (completedFiles.length / uploadedFiles.length) * 100 
    : 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Calculadora de Huella de Carbono
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Procesa archivos XML y PDF para calcular emisiones por ubicación
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1 text-xs">
            <MapPin className="h-3 w-3" />
            {totalLocations} ubicaciones
          </Badge>
          <Badge variant="outline" className="gap-1 text-xs">
            <Calculator className="h-3 w-3" />
            {totalEmissions.toFixed(1)} tCO₂
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="upload" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <Upload className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Cargar</span>
            <span className="sm:hidden">Archivos</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
            <span>Ubicaciones</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <Calculator className="h-3 w-3 md:h-4 md:w-4" />
            <span>Resultados</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 md:space-y-6">
          {/* File Upload Zone */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Cargar Archivos</CardTitle>
              <CardDescription className="text-sm">
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
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl">Archivos Cargados</CardTitle>
                <CardDescription className="text-sm">
                  Estado del procesamiento de archivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex flex-col gap-3 p-3 md:p-4 border rounded-lg md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-start gap-3 md:items-center">
                        <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                          <FileText className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm md:text-base truncate">{file.name}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {file.type.toUpperCase()} • {(file.size / 1024 / 1024).toFixed(2)} MB
                            {file.processedData && (
                              <>
                                {' • '}{file.processedData.locations.length} ubicaciones
                                {' • '}{file.processedData.totalEmissions.toFixed(1)} tCO₂
                              </>
                            )}
                          </div>
                          {file.error && (
                            <div className="text-xs text-red-600 mt-1">
                              Error: {file.error}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-end">
                        {file.status === 'pending' && (
                          <Badge variant="secondary" className="text-xs">Pendiente</Badge>
                        )}
                        {file.status === 'processing' && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Procesando
                          </Badge>
                        )}
                        {file.status === 'completed' && (
                          <Badge variant="default" className="gap-1 bg-green-500 text-xs">
                            <CheckCircle className="h-3 w-3" />
                            Completado
                          </Badge>
                        )}
                        {file.status === 'error' && (
                          <>
                            <Badge variant="destructive" className="gap-1 text-xs">
                              <AlertCircle className="h-3 w-3" />
                              Error
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => retryFile(file.id)}
                              className="text-xs h-7"
                            >
                              Reintentar
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {isProcessing && (
                  <div className="mt-4 md:mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Procesando archivos...</span>
                      <span className="text-sm text-muted-foreground">
                        {completedFiles.length}/{uploadedFiles.length} completados
                      </span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="locations" className="space-y-4 md:space-y-6">
          <LocationGrid 
            files={completedFiles} 
            processedData={completedFiles.map(f => f.processedData!).filter(Boolean)}
          />
        </TabsContent>

        <TabsContent value="results" className="space-y-4 md:space-y-6">
          <CalculationResults 
            totalLocations={totalLocations}
            totalEmissions={totalEmissions}
            files={completedFiles}
            processedData={completedFiles.map(f => f.processedData!).filter(Boolean)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}