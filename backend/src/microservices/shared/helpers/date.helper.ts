export class DateHelper{
  static now(): string{
    return new Date().toISOString()
  }
}