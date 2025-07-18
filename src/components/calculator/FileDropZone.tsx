import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface FileDropZoneProps {
  onFilesUploaded: (files: File[]) => void
}

export function FileDropZone({ onFilesUploaded }: FileDropZoneProps) {
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles.map(file => {
        if (file.errors.some((e: any) => e.code === 'file-too-large')) {
          return `${file.file.name}: archivo demasiado grande (máximo 50MB)`
        }
        if (file.errors.some((e: any) => e.code === 'file-invalid-type')) {
          return `${file.file.name}: tipo de archivo no válido`
        }
        return `${file.file.name}: archivo rechazado`
      })
      setError(`Archivos rechazados: ${reasons.join(', ')}`)
    }

    if (acceptedFiles.length === 0 && rejectedFiles.length === 0) {
      setError('No se seleccionaron archivos válidos.')
      return
    }

    if (acceptedFiles.length > 0) {
      setSelectedFiles(acceptedFiles)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/xml': ['.xml'],
      'text/xml': ['.xml'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  })

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onFilesUploaded(selectedFiles)
      setSelectedFiles([])
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setSelectedFiles([])
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors
          ${isDragActive && !isDragReject ? 'border-primary bg-primary/5' : ''}
          ${isDragReject ? 'border-destructive bg-destructive/5' : ''}
          ${!isDragActive ? 'border-muted-foreground/25 hover:border-muted-foreground/50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full
            ${isDragActive && !isDragReject ? 'bg-primary text-primary-foreground' : 'bg-muted'}
            ${isDragReject ? 'bg-destructive text-destructive-foreground' : ''}
          `}>
            {isDragReject ? (
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8" />
            ) : (
              <Upload className="h-6 w-6 md:h-8 md:w-8" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base md:text-lg font-semibold">
              {isDragActive
                ? isDragReject
                  ? 'Archivos no válidos'
                  : 'Suelta los archivos aquí'
                : 'Arrastra archivos XML y PDF aquí'
              }
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isDragReject
                ? 'Solo se permiten archivos XML y PDF'
                : 'O haz clic para seleccionar archivos (máximo 50MB por archivo)'
              }
            </p>
          </div>
          
          {!isDragActive && (
            <Button variant="outline" className="text-sm">
              <FileText className="mr-2 h-4 w-4" />
              Seleccionar Archivos
            </Button>
          )}
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Archivos seleccionados ({selectedFiles.length})
            </h4>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-7">
              Limpiar todo
            </Button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 md:p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded bg-background flex-shrink-0">
                    <FileText className="h-3 w-3 md:h-4 md:w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs md:text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {file.name.toLowerCase().endsWith('.xml') ? 'XML' : 'PDF'} • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Listo
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button onClick={handleUpload} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Procesar {selectedFiles.length} archivo{selectedFiles.length !== 1 ? 's' : ''}
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 md:p-4 rounded-lg">
        <div className="font-medium mb-2">Información importante:</div>
        <p>• <strong>Formatos soportados:</strong> XML, PDF</p>
        <p>• <strong>Tamaño máximo:</strong> 50MB por archivo</p>
        <p>• <strong>Archivos XML:</strong> Deben contener datos de consumo energético con estructura de ubicaciones</p>
        <p>• <strong>Archivos PDF:</strong> Facturas o reportes de emisiones (procesamiento automático)</p>
        <p>• <strong>Múltiples archivos:</strong> Puedes cargar varios archivos a la vez</p>
        <p>• <strong>Procesamiento:</strong> Los archivos se procesan secuencialmente para calcular emisiones</p>
        <div className="mt-3 pt-2 border-t border-muted-foreground/20">
          <p className="font-medium mb-1">¿Necesitas un ejemplo?</p>
          <a 
            href="/sample-energy-data.xml" 
            download="sample-energy-data.xml"
            className="text-primary hover:text-primary/80 underline"
          >
            Descargar archivo XML de ejemplo
          </a>
        </div>
      </div>
    </div>
  )
}