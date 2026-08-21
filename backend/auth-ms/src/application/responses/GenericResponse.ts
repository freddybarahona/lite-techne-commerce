export interface GenericResponse{
  type: boolean
  statusCode: number
  message: string
  data?: any
  errors?: string[]
  timestamp: string
}