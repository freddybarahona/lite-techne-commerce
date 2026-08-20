export interface IUserRepository{
  ifExistsName(data: string): Promise<Boolean>
  ifExistsID(data: number): Promise<Boolean>
}