import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FileDropZoneProps {
  onFilesUploaded: (files: File[]) => void
}

export function FileDropZone({ onFilesUploaded }: FileDropZoneProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      setError('Algunos archivos fueron rechazados. Solo se permiten archivos XML y PDF.')
      return
    }

    if (acceptedFiles.length === 0) {
      setError('No se seleccionaron archivos válidos.')
      return
    }

    onFilesUploaded(acceptedFiles)
  }, [onFilesUploaded])

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

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive && !isDragReject ? 'border-primary bg-primary/5' : ''}
          ${isDragReject ? 'border-destructive bg-destructive/5' : ''}
          ${!isDragActive ? 'border-muted-foreground/25 hover:border-muted-foreground/50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            flex h-16 w-16 items-center justify-center rounded-full
            ${isDragActive && !isDragReject ? 'bg-primary text-primary-foreground' : 'bg-muted'}
            ${isDragReject ? 'bg-destructive text-destructive-foreground' : ''}
          `}>
            {isDragReject ? (
              <AlertCircle className="h-8 w-8" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {isDragActive
                ? isDragReject
                  ? 'Archivos no válidos'
                  : 'Suelta los archivos aquí'
                : 'Arrastra archivos XML y PDF aquí'
              }
            </h3>
            <p className="text-sm text-muted-foreground">
              {isDragReject
                ? 'Solo se permiten archivos XML y PDF'
                : 'O haz clic para seleccionar archivos (máximo 50MB por archivo)'
              }
            </p>
          </div>
          
          {!isDragActive && (
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Seleccionar Archivos
            </Button>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Formatos soportados: XML, PDF</p>
        <p>• Tamaño máximo por archivo: 50MB</p>
        <p>• Múltiples archivos permitidos</p>
        <p>• Los archivos XML deben contener datos de consumo energético</p>
        <p>• Los archivos PDF deben contener facturas o reportes de emisiones</p>
      </div>
    </div>
  )
}