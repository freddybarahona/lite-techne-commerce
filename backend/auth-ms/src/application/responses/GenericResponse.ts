export interface GenericResponse{
  success: boolean
  statusCode: number
  message: string
  data?: any
  errors?: string[]
  timestamp: string
}