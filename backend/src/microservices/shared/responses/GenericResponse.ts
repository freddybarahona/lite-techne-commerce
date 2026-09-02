export interface GenericResponse<data>{
  success: boolean
  statusCode: number
  message: string
  data?: data
  errors?: string[]
  timestamp: string
}